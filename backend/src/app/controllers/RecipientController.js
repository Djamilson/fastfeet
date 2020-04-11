import { Op } from 'sequelize';

import Recipient from '../models/Recipient';
import Address from '../models/Address';
import Person from '../models/Person';
import Phone from '../models/Phone';

import SearchRecipientIdService from '../services/SearchRecipientIdService';

import IndexRecipientService from '../services/IndexRecipientService';

class RecipientController {
  async index(req, res) {
    const { page, limit, q } = req.query;
    const pageSize = limit;

    const query = `%${q || ''}%`; // string de consulta

    const querywhere = {
      name: { [Op.iLike]: query },
      status: true,
    };

    const { recipients, recipientInfo } = await IndexRecipientService.run({
      page,
      pageSize,
      querywhere,
    });

    const newRecipient = { recipients, recipientInfo };

    return res.status(200).json(newRecipient);
  }

  async store(req, res) {
    const { email, name, phone } = req.body.person;
    const { prefix, number } = phone;
    const { address } = req.body;

    const personExists = await Person.findOne({
      where: { email },
    });

    if (personExists) {
      return res.status(401).json({ error: 'Recipient already exists.' });
    }

    const phoneExists = await Phone.findOne({
      where: { prefix, number },
      attributes: ['id', 'prefix', 'number'],
    });

    if (phoneExists) {
      return res.status(402).json({ error: 'Phone already exists.' });
    }

    const person = await Person.create({
      name,
      email,
    });

    const newPhone = await Phone.create({ ...phone, person_id: person.id });

    await person.update({
      phone_man_id: newPhone.id,
    });

    const { id: address_id } = await Address.create({
      ...address,
      city_id: address.city.city,
      person_id: person.id,
    });

    const { id } = await Recipient.create({
      address_id,
      person_id: person.id,
    });

    const newRecipient = await SearchRecipientIdService.run({ id });
    return res.status(200).json(newRecipient);
  }

  async update(req, res) {
    const { person, address: newAddress } = req.body;
    const { phone } = req.body.person;

    //id do recipient
    const { id } = req.params;
    const {
      number: number_address,
      street: street_address,
      complement: complement_address,
      zip_code: zip_address,
      district: district_address,
      city: city_address,
    } = newAddress;

    const address = {
      number: number_address,
      street: street_address,
      complement: complement_address,
      zip_code: zip_address,
      district: district_address,
      city_id: city_address.city,
    };

    const recipientExists = await Recipient.findByPk(id);

    if (!recipientExists) {
      return res.status(401).json({ error: 'Recipient not exists.' });
    }

    const { person_id, address_id } = recipientExists;

    const personExist = await Person.findByPk(person_id, {
      include: [
        {
          model: Phone,
          as: 'phone',
          attributes: ['id', 'prefix', 'number'],
        },
      ],
    });

    if (person.email !== personExist.email) {
      const recipient = await Person.findOne({
        where: { email: person.email },
      });

      if (recipient) {
        return res.status(400).json({ error: 'Recipient already exists.' });
      }
    }

    const { phone: phoneExists } = personExist;

    if (
      phoneExists.prefix !== phone.prefix ||
      phoneExists.number !== phone.number
    ) {
      const { prefix, number } = phone;
      const phoneExistss = await Phone.findOne({
        where: { prefix, number },
        attributes: ['id', 'prefix', 'number'],
      });

      if (phoneExistss) {
        return res.status(402).json({ error: 'Phone already exists.' });
      }
    }

    const addressExist = await Address.findByPk(address_id, {
      attributes: [
        'id',
        'number',
        'street',
        'complement',
        'zip_code',
        'district',
        'person_id',
        'city_id',
      ],
    });

    if (!addressExist) {
      return res.status(403).json({ error: 'Address not exists.' });
    }

    await personExist.update({
      name: person.name,
      email: person.email,
    });

    await phoneExists.update(phone);
    await addressExist.update(address);

    const newRecipient = await SearchRecipientIdService.run({ id });

    return res.json(newRecipient);
  }

  async delete(req, res) {
    const recipientExists = await Recipient.findByPk(req.params.id, {
      include: [{ model: Person, as: 'person', attributes: ['id', 'status'] }],
    });

    if (!recipientExists) {
      return res.status(400).json({
        error: 'Recipient not found.',
      });
    }

    const { person } = recipientExists;
    await person.update({ status: !person.status });

    return res.status(200).json({
      success: 'Recipient delete.',
    });
  }
}

export default new RecipientController();
