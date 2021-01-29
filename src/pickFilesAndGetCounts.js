import DocumentPicker from './DocumentPicker';

const splitFileToLines = data => data.split('\n').slice(0, -1);

const pickFilesAndGetCounts = async config => {
  let counts = {
    blank: 0,
    comments: 0,
    code: {
      import: 0,
      varDecl: 0,
      total: 0,
    },
    total: 0,
  };

  let result = await DocumentPicker.getDocumentAsync({
    type: config.type,
    multiple: config.pickMulitple,
  });
  let files = result.output.map(t => {
    return splitFileToLines(t.data);
  });

  files.map(file => {
    let isMultilineComment = false;
    file.map(line => {
      line = line.trim();
      counts.total = counts.total + 1;

      if (config.isBlank && config.isBlank(line)) {
        counts.blank = counts.blank + 1;
        return line;
      }

      if (config.isSingleLineComment && config.isSingleLineComment(line)) {
        counts.comments = counts.comments + 1;
        return line;
      }

      if (config.isMultilineComment) {
        if (isMultilineComment) {
          if (config.checkMultiLineCommentEnded(line)) {
            isMultilineComment = false;
          }
          counts.comments = counts.comments + 1;
          return line;
        }

        if (!isMultilineComment && config.checkMultiLineCommentStarted(line)) {
          isMultilineComment = true;
          counts.comments = counts.comments + 1;
          return line;
        }
      }

      if (config.isImport && config.isImport(line)) {
        counts.code.import = counts.code.import + 1;
      } else if (
        config.isVariableDeclarations &&
        config.isVariableDeclarations(line)
      ) {
        counts.code.varDecl = counts.code.varDecl + 1;
      }
      counts.code.total = counts.code.total + 1;
      return line;
    });
    console.log('lines', file, counts);
  });
  return {counts, filesCount: files.length};
};

export default pickFilesAndGetCounts;
