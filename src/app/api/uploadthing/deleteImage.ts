import { NextApiRequest, NextApiResponse } from 'next';
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { file } = req.body;
    if (!file) {
      return res.status(400).json({ error: 'File key is required' });
    }

    try {
      await utapi.deleteFiles(file);
      return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Error deleting image:', error);
      return res.status(500).json({ error: 'Failed to delete image' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}