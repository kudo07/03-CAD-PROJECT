import { prisma } from '../config/connection.js';
import { errorHandler } from '../utils/error.js';

export const getAllBlocks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * 10;

    const blocks = await prisma.block.findMany({
      skip,
      take: limit,
      include: { file: true },
      orderBy: { name: 'asc' },
    });
    const total = await prisma.block.count();

    res.json({
      data: blocks,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, 'FAILED TO FETCH THE BLOKS'));
  }
};
export const getBlockById = async (req, res) => {
  try {
    const { id } = req.params;

    const block = await prisma.block.findUnique({
      where: { id },
      include: { file: true },
    });

    if (!block) return res.status(404).json({ error: 'Block not found' });

    res.json(block);
  } catch (err) {
    console.error(err);
    next(errorHandler(500, 'ERROR FETCHING BLOVK'));
  }
};

export const searchBlock = async (req, res) => {
  try {
    const { name, type } = req.query;

    const blocks = await prisma.block.findMany({
      where: {
        AND: [
          name ? { name: { contains: name, mode: 'insensitive' } } : {},
          type ? { type } : {},
        ],
      },
      orderBy: { name: 'asc' },
    });

    res.json(blocks);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, 'FAILED TO SEARCH BLOCKS'));
  }
};
