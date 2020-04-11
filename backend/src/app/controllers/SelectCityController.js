import { Op } from 'sequelize';
import IndexCityService from '../services/IndexCityService';

class SelectCityController {
  async index(req, res) {
    const { page, limit, q } = req.query;
    const pageSize = limit;
    const { state_id } = req.params;

    const query = `%${q || ''}%`; // string de consulta

    const querywhere = {
      name: { [Op.iLike]: query },
      state_id,
    };

    const { itens, cityInfo } = await IndexCityService.run({
      page,
      pageSize,
      querywhere,
    });

    const newCities = { itens, cityInfo };

    return res.json(newCities);
  }
}

export default new SelectCityController();
