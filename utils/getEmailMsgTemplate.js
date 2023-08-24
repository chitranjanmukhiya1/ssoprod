const getEmailMsgTemplate = (content, name) => {
  const user = name ? `Dear ${name}` : "Hii"
  var msg = `
    <html>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Stylish&display=swap" rel="stylesheet">

    </head>
    <body>
    <div style='background-color:#f9f9f9;position:relative;padding-top:25px;padding-bottom:25px'>
        <table style='position:relative;
                      margin:0 auto;
                      max-width:600px;
                      background-color:white; 
                      width:100%; 
                      padding-top:25px; 
                      border: solid 1px #dfdfdf;
                      border-top: solid 5px #5626c4;

                    '>
            <tr>
                <td style="text-align:center">
                    <img style="height:80px;" src="cid:__tenanzy_logo">
                </td>
            <tr>
            <tr>
                <td style='padding-left:20px; padding-right:20px;padding-top:20px; font-family:Arial; font-size:16px; color:#555555'>
                <p style='text-transform:capitalize; font-size:14px;'> ${user},</p> 
                  ${content}
                </td>
            </tr>
            <tr>
                <td style=' font-family: Arial;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: 1.43;
                            letter-spacing: normal;
                            color: #555555;
                            padding-left:20px;
                            padding-right:20px;
                            padding-bottom:20px;
                            font-family:Arial;
                            margin-top:20px;
                '>
               <!--src="cid:__tenanzy_logo" We at ${process.env.COMPANYNAME} hope you and your family are well and safe during this difficult time. Our thoughts are with our community and we hope to do what we can to help through this crisis.-->
                <p> Kind Regards,<br/>
                ${process.env.COMPANYNAME}<br/>
                <a href="https://ykyog.org/">jaiinfoway.com</a>
                </p>
                </td>
            </tr>
        </table>

        <div style='display:table;
                max-width:500px;
                margin:auto;
                margin-top:30px;
                padding-bottom:50px;
                font-size:12px;
                color:#818181;
                text-align: center;'
        >
    This email message is confidential, may be privileged, and is intended for the exclusive use of the addressee. Any other person is strictly prohibited from disclosing or reproducing it. If the addressee cannot be reached or is unknown to you, please inform the sender by return email and delete this email message and all copies immediately.
        </div>
    </div>
    </body>
    </html>`

  return msg
}

module.exports = getEmailMsgTemplate

//font:  font-family: 'Barlow', sans-serif;
