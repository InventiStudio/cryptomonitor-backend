import nodemailer from 'nodemailer'
import sparkPostTransport from 'nodemailer-sparkpost-transport'
import config from '@/lib/config'

const transporter = nodemailer.createTransport(sparkPostTransport({
  sparkPostApiKey: config.secrets.sparkpost_key,
  options: { sandbox: config.mail.sandbox },
}))

function send({ to, template_id, substitution_data }) {
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      content: { template_id },
      recipients: [{ address: { email: to } }],
      substitution_data,
    }, (err, info) => {
      if (err) {
        reject(err)
      }
      resolve(info)
    })
  })
}

export default { send }
