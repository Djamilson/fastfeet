import Person from '../models/Person';
import State from '../models/State';

class SelectStateController {
  //retorno para o select
  async index(req, res) {
    const states = await State.findAll({
      attributes: ['id', 'name', 'acronym'],
    });

    const options = states.map(state => ({
      value: state.id,
      label: state.name,
    }));
    return res.json(options);
  }
}

export default new SelectStateController();
