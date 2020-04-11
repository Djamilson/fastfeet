import CreateFileService from '../services/CreateFileService';
import UpdateFileService from '../services/UpdateFileService';

class FileController {
  async store(req, res) {
    const {
      originalname: name,
      filename: path,
      key,
      destination,
      location,
      path: filePath,
    } = req.file;

    const file = await CreateFileService.run({
      name,
      path,
      key,
      destination,
      location,
      filePath,
    });

    return res.json(file);
  }

  async update(req, res) {

    const { id } = req.params;

    const {
      originalname: name,
      filename: path,
      key,
      destination,
      location,
      path: filePath,
    } = req.file;

    const file = await UpdateFileService.run({
      id_file: id,
      name,
      path,
      key,
      destination,
      location,
      filePath,
    });

    return res.json({ file });
  }
}

export default new FileController();
