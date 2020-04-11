import Person from '../models/Person';

class PersonController {
  async index(req, res) {
    const listPerson = await Person.findAll({
      attributes: [
        'id',
        'name',
        'email'
      ],
    });

    return res.json(listPerson);
  }

}

export default new PersonController();
