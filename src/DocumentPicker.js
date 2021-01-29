export default {
  get name() {
    return 'DocumentPicker';
  },

  async getDocumentAsync({type = '*/*', multiple = false}) {
    const input = document.createElement('input');
    input.style.display = 'none';
    input.setAttribute('type', 'file');
    input.setAttribute('accept', type);
    input.setAttribute('id', 'test');
    if (multiple) {
      input.setAttribute('multiple', 'multiple');
    }
    const lineCount = text => {
      var nLines = 0;
      for (var i = 0, n = text.length; i < n; ++i) {
        if (text[i] === '\n') {
          ++nLines;
        }
      }
      return nLines;
    };

    document.body.appendChild(input);

    return new Promise((resolve, reject) => {
      input.addEventListener('change', () => {
        let finalData = [];
        if (input.files) {
          let files = input.files || [];
          if (files.length) {
            for (let index = 0; index < files.length; index++) {
              //instantiate a FileReader for each file to read
              // eslint-disable-next-line no-undef
              let reader = new FileReader();
              reader.onload = async function () {
                console.log('reader result', reader.result);
                let match = reader.result.match(/\r?\n/g);

                console.log('reader result 1', match, lineCount(reader.result));
                console.log('reader result 2', reader.result.split('\n'));
                finalData[index] = {
                  data: reader.result ? reader.result : null,
                  name: input.files[index].name,
                };
                console.log('file data', reader.result, finalData); //File data
                if (index === files.length - 1) {
                  resolve({
                    type: 'success',
                    output: finalData,
                  });
                }
              };
              reader.readAsText(files[index]);
            }
          }
        } else {
          resolve({type: 'fail'});
        }

        document.body.removeChild(input);
      });

      // eslint-disable-next-line no-undef
      const event = new MouseEvent('click');
      input.dispatchEvent(event);
    });
  },
};
