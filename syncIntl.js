/**
 * Synchornizes the intl files:
 * /messages/__/base.php
 * 
 * This script reads through every .php file and finds
 * `label(Yii::t('GalleryModule.base', '<LABEL NAME>'))`
 * We then inventory the found labels and add/remove them from the base.php files
 */

const fs = require('fs')
const fsPromise = require('fs/promises')
const path = require('path')

const titleRegex = /label\(Yii::t\('GalleryModule\.base', ?'([\w ]*)'\)/

var walk = function(dir, done) {
  var results = []
  fs.readdir(dir, function(err, list) {
      if (err) return done(err)

      var pending = list.length
      
      if (!pending) return done(null, results)
      
      list.forEach((file) => {
        file = path.resolve(dir, file)
        fs.stat(file, (err, stat) => {
            if (stat && stat.isDirectory()) {
              walk(file, (err, res) => {
                results = results.concat(res)
                if (!--pending) done(null, results)
              })
            } else {
              results.push(file);
              if (!--pending) done(null, results)
            }
        })
      })
  })
}

const syncIntl = () => {
  // Find all the translation files
  walk(path.resolve(__dirname, 'messages'), (err, translationFiles) => {
    // With all the file names, we open each
    // console.log(translationFiles)
    // Find all .php files in the view directories
    walk(path.resolve(__dirname, 'views'), (err, viewFiles) => {
      // console.log(viewFiles)
      // With all the file names, we open each
      viewFiles.forEach(async (viewFile) => {
        const fileContents = await fsPromise.readFile(viewFile)
        const foundLabels = RegExp(titleRegex).exec(fileContents)
        console.log(foundLabels?.length)
        // await fsPromise.writeFile('out.txt', fileContents)
      })
    })
  })

}

syncIntl()