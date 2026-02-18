import dotenv from "dotenv";
dotenv.config(); // 👈 هذا السطر كان ناقص

import { getMessaging } from './firebase.js';

(async () => {
  try {
    const response = await getMessaging().send({
      token: 'PUT_REAL_FCM_TOKEN_HERE',
      notification: {
        title: 'Test',
        body: 'Firebase + Node شغال 💪',
      },
    });

    console.log('✅ FCM OK:', response);
    process.exit(0);
  } catch (e) {
    console.error('❌ FCM ERROR:', e);
    process.exit(1);
  }
})();
