import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import User from '../models/User'

class SessionController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })

      await schema.validate(request.body)

      const { email, password } = request.body

      const user = await User.findOne({ where: { email } })

      if (!user) {
        return response
          .status(400)
          .json({ error: 'Make sure your password or email are correct' })
      }

      const passwordMatch = await user.checkPassword(password)

      if (!passwordMatch) {
        return response
          .status(400)
          .json({ error: 'Make sure your password or email are correct' })
      }

      return response.json({
        id: user.id,
        email,
        name: user.name,
        admin: user.admin,
        token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export default new SessionController()
