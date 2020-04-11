import City from '../models/City';

class SearchCityStateIdService {
  async run({ state_id }) {
    const cities = await City.findAll({
      where: { state_id },
      attributes: ['id', 'name', 'state_id'],
    });

    const options = cities.map(city => ({
      value: city.id,
      label: city.name,
    }));

    return options;
  }
}
export default new SearchCityStateIdService();
