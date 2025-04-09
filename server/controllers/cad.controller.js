import { prisma } from '../config/connection.js';
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';
import DxfParser from 'dxf-parser';
import { errorHandler } from '../utils/error.js';

export const uploadFile = async (req, res, next) => {
  try {
    const file = req.file;
    // console.log(file);

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'auto',
    });

    const newCADFile = await prisma.cADFile.create({
      data: {
        name: file.originalname,
        url: result.secure_url,
      },
    });

    const parser = new DxfParser();
    const dxfContent = fs.readFileSync(file.path, 'utf8');
    const parsed = parser.parseSync(dxfContent);

    let blockCount = 0;

    if (parsed.blocks) {
      for (const [blockName, blockData] of Object.entries(parsed.blocks)) {
        // console.log(blockName);

        const baseX = blockData.basePoint?.x || 0;
        const baseY = blockData.basePoint?.y || 0;
        // console.log();

        await prisma.block.create({
          data: {
            name: blockName,
            baseX,
            baseY,
            fileId: newCADFile.id,
          },
        });

        blockCount++;
      }
    }

    const insertEntities = parsed.entities.filter((e) => e.type === 'INSERT');
    for (const insert of insertEntities) {
      const baseX = insert.position?.x || 0;
      const baseY = insert.position?.y || 0;

      await prisma.block.create({
        data: {
          name: insert.name,
          baseX,
          baseY,
          fileId: newCADFile.id,
        },
      });
    }

    res.status(200).json({
      message: 'File uploaded and blocks extracted successfully.',
      fileUrl: result.secure_url,
      totalBlocks: blockCount,
    });
  } catch (err) {
    console.error(err);
    next(errorHandler(500, 'FAILED TO UPLOAD FILE'));
  }
};
