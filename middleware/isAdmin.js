module.exports.isAdmin = (req, res, next) => {
  console.log(req.user)
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  
  next();
};