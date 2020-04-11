import State from '../models/State';
import SearchCityStateIdService from '../services/SearchCityStateIdService';

class SearchCityController {
  //retorno para o select
  async index(req, res) {
    const { state_id } = req.params;

    const cities = await SearchCityStateIdService.run({ state_id });

    return res.json(cities);
  }
}

export default new SearchCityController();
