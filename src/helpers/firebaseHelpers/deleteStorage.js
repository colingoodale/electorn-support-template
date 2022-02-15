import firebaseApp from '../../auth/firebase';

const storage = firebaseApp.storage();

// https://firebase.google.com/docs/storage/web/delete-files
export default async refPath => {
  const ref = storage.ref(refPath)
  return await ref.delete()
}
