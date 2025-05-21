const Url = require('../models/Url');
const { nanoid } = require('nanoid');

const BASE_URL = 'http://localhost:8000';

exports.shortenUrl = async (req, res) => {
  const { originalUrl, expireAt, customAlias } = req.body;

  if (!originalUrl) return res.status(400).json({ message: 'URL gerekli' });

  if (originalUrl.includes('forbidden.com')) {
    return res.status(403).json({ error: 'Bu alan adı kullanılamaz.' });
  }

  try {
    let shortId = customAlias || nanoid(6);

    // Aynı custom alias varsa hata
    const exists = await Url.findOne({ shortId });
    if (exists) return res.status(400).json({ message: 'Bu kısa bağlantı zaten mevcut.' });

    const newUrl = new Url({
      originalUrl,
      shortId,
      expireAt: expireAt ? new Date(expireAt) : undefined
    });

    await newUrl.save();
    res.json({ shortUrl: `${BASE_URL}/${shortId}` });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

exports.redirectToOriginal = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).send('Bağlantı bulunamadı');

    if (url.expireAt && url.expireAt < new Date()) {
      return res.status(410).send('Bağlantının süresi dolmuş');
    }

    url.clickCount += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
};

exports.getStats = async (req, res) => {
  const { shortId } = req.params;
  try {
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).json({ message: 'Kısa bağlantı bulunamadı' });

    res.json({
      originalUrl: url.originalUrl,
      clickCount: url.clickCount,
      createdAt: url.createdAt,
      expireAt: url.expireAt
    });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};
