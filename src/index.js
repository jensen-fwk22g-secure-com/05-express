import * as dotenv from 'dotenv'
dotenv.config()
// dotenv behöver bara importeras en gång per projekt.
// Det första som händer. Se till att .env-filen ligger i projektets rotmapp.

import { app } from './server.js'
const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log('Server is listening on port ' + PORT)
})