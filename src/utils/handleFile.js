import { admin } from '../backend/firebase'

const fileType = {
  "image": ["image/png","image/jpg","image/jpeg"],
  "video": ["video/mp4"],
  "audio": ["audio/mp3", "audio/wav", "audio/mpeg"]
}

 // 1. finding type of file from extension
export const findDocType = (type) => {
  var result = ""
  Object.keys(fileType).map((res, i) => {
    if (fileType[res].includes(type)) {
      result = res
    }
  })
  return result
}


// 2. uploading and giving links
export const uploadFiles = (docID, file, file_name) => {
  const ref = admin.storage().ref("posts").child(docID+"").child(file_name)
  return ref.put(file).then(function(snap) {
          return ref.getDownloadURL().then((url) => {
            return {
              "type": file.type,
              "link": url,
              "name": file.name
            }
          })
      }).catch(function(e) {
          return {
            "status": "error",
            "message": e.message
          }
      })
}
