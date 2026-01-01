

const getCookieStatus = async (req, res) => {
   res.status(200).json({
    message: "Valid token",
    info:req.data
  });
};

export default getCookieStatus;
