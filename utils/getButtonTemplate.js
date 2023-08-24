const UIURL = require("../utils/config")

const getButtonTemplate = (url, caption) => {
  const link = process.env.PROD_FRONTEND_URL + url

  var content = ` <div style="min-width:200px;display:table;text-align:center;margin:auto">
    <a href='${link}' 
    style="background-color: #5626c4;
            padding: 16px 30px;
            text-decoration: none;
            font-family:Arial;
            font-size:16px;
            font-weight: bold;
            color: white; 
            margin-top: 10px; 
            margin-bottom: 10px;
            margin:auto;
            display: block;">${caption}</a>
    </div>`
  return content
}

module.exports = getButtonTemplate
