import firebaseApp from '../../auth/firebase'

const storage = firebaseApp.storage();

export default async (image, refUrl) => {
  console.log('image', image)
  const metadata = {
    contentType: image.type
  }
  return new Promise(function(resolve, reject) {
    const storageRef = storage.ref(refUrl)
    const uploadTask = storageRef.put(image, metadata)
    uploadTask.on('state_changed',
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      function error(err) {
        console.log('error', err)
        reject()
      },
      function complete() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          resolve(downloadURL)
        })
      }
    )
  })
}