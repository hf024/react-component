export function getMd5 (file) {
	return new Promise((resolve, reject) => {
		window.browserMD5File(file, (err, md5) => {
			if (err) {
				reject(new Error(err))
			}
			resolve(md5)
		})
	})
}
