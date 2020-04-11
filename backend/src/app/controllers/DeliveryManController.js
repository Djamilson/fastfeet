import Crypto from 'crypto';
import { Op } from 'sequelize';
import Person from '../models/Person';
import Deliveryman from '../models/Deliveryman';
import Phone from '../models/Phone';
import Group from '../models/Group';
import Address from '../models/Address';

import CreateUserService from '../services/CreateUserServices';
import CreateFileService from '../services/CreateFileService';
import UpdateFileService from '../services/UpdateFileService';
import IndexDeliverymanService from '../services/IndexDeliverymanService';

class DeliveryManController {
  async index(req, res) {
    const { page, limit, q } = req.query;
    const pageSize = limit;

    const query = `%${q || ''}%`; // string de consulta

    const querywhere = {
      name: { [Op.iLike]: query },
      status: true,
    };

    const { deliverymans, deliverymanInfo } = await IndexDeliverymanService.run(
      {
        page,
        pageSize,
        querywhere,
      }
    );

    const newDeliverymans = { deliverymans, deliverymanInfo };

    return res.status(200).json(newDeliverymans);
  }

  async store(req, res) {
    const {
      originalname: name,
      filename: path,
      key,
      destination,
      location,
      path: filePath,
    } = req.file;

    const {
      id,
      name: namePerson,
      email,
      id_phone,
      prefix,
      numberPhone,
      street,
      number,
      complement,
      zip_code,
      district,
      city,
      state,
    } = req.body;

    const personExists = await Person.findOne({ where: { email } });

    if (personExists) {
      return res.status(401).json({ error: 'User already exists.' });
    }

    const groupExists = await Group.findOne({
      where: { name: 'role-entregador' },
    });

    if (!groupExists) {
      return res
        .status(405)
        .json({ error: 'Não foi possível encontrar o grupo para associar.' });
    }

    const phoneExists = await Phone.findOne({
      where: { prefix, number: numberPhone },
      attributes: ['id', 'prefix', 'number'],
    });

    if (phoneExists) {
      return res.status(402).json({ error: 'Phone already exists.' });
    }

    const newFile = await CreateFileService.run({
      name,
      path,
      key,
      destination,
      location,
      filePath,
    });

    const newPerson = await Person.create({
      name: namePerson,
      email,
      avatar_id: newFile._id,
    });

    const newAddress = await Address.create({
      street,
      number,
      complement,
      zip_code,
      district,
      city_id: city,
      person_id: newPerson.id,
    });

    const newPhone = await Phone.create({
      prefix,
      number: numberPhone,
      person_id: newPerson.id,
    });

    await newPerson.update({
      phone_man_id: newPhone.id,
    });

    const { id: group_id } = groupExists;

    const password = Crypto.randomBytes(4).toString('HEX');
    const admin_master = false;
    const is_verified = true;

    await Deliveryman.create({
      address_id: newAddress.id,
      person_id: newPerson.id,
      password,
    });

    await CreateUserService.run({
      password,
      admin_master,
      person_id: newPerson.id,
      group_id,
      is_verified,
    });

    return res.status(200).json({ success: true });
  }

  async update(req, res) {

    const {
      name: namePerson,
      email,
      prefix,
      numberPhone,
      file,
      id_file,

      street,
      number,
      complement,
      zip_code,
      district,
      city,
    } = req.body;

    const { id } = req.params;

    const deliverymanExist = await Deliveryman.findByPk(id, {
      include: [
        {
          model: Person,
          as: 'person',
          attributes: ['id', 'name', 'email', 'avatar_id', 'phone_man_id'],
          include: [
            {
              model: Phone,
              as: 'phone',
              attributes: ['id', 'prefix', 'number'],
            },
          ],
        },
        {
          model: Address,
          as: 'address',
          attributes: [
            'id',
            'street',
            'number',
            'complement',
            'zip_code',
            'district',
            'city_id',
          ],
        },
      ],
    });

    if (!deliverymanExist) {
      return res.status(401).json({ error: 'Deliveryman not exists.' });
    }

    if (email !== deliverymanExist.person.email) {
      const person = await Person.findOne({ where: { email } });

      if (person) {
        return res.status(402).json({ error: 'User already exists.' });
      }
    }

    const { person: bdPerson } = deliverymanExist;
    const { phone: phoneExist } = deliverymanExist.person;
    const { address: addressExist } = deliverymanExist;

    if (!phoneExist) {
      return res.status(403).json({ error: 'Phone not exists.' });
    }

    if (prefix !== phoneExist.prefix || numberPhone !== phoneExist.number) {
      const newPhone = await Phone.findOne({
        where: { prefix, number: numberPhone },
        attributes: ['id', 'prefix', 'number'],
      });

      if (newPhone) {
        return res.status(404).json({ error: 'Phone already exists.' });
      }
    }

    /**
     * validando a imagem
     *
     */

    if (file != '') {
    
      const {
        originalname: name,
        filename: path,
        key,
        destination,
        location,
        path: filePath,
      } = req.file;

      await UpdateFileService.run({
        id_file,
        name,
        path,
        key,
        destination,
        location,
        filePath,
      });
    }

    await bdPerson.update({ name: namePerson, email });
    await phoneExist.update({ prefix, numberPhone });

    await addressExist.update({
      street,
      number,
      complement,
      zip_code,
      district,
      city_id: city,
    });

    return res.status(200).json({ success: true });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliverymanExist = await Deliveryman.findByPk(id, {
      include: [
        {
          model: Person,
          as: 'person',
        },
      ],
    });

    if (!deliverymanExist) {
      return res.status(400).json({ error: 'Deliveryman not exists.' });
    }
    const { person } = deliverymanExist;
    const status = !person.status;

    await person.update({ status });

    return res.status(200).json({ sucess: 'Success!' });
  }
}

export default new DeliveryManController();
