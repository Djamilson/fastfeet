import City from '../models/City';

class IndexCityService {
  async run({ page, pageSize, querywhere }) {

    const ret = await City.findAndCountAll({
      where: { ...querywhere },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [['name', 'ASC']],
    });

    const pages = Math.ceil(ret.count / pageSize);

    const cityInfo = { page, pages, total: ret.count, limit: pageSize };

    const cities = await City.findAll({
      where: { ...querywhere },
      order: [['name', 'ASC']],
      attributes: ['id', 'name', 'state_id'],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const itens = cities.map(city => ({
      value: city.id,
      label: city.name,
    }));

    return { itens, cityInfo };
  }
}
export default new IndexCityService();
