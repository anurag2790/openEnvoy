class Utils {
  isBlank(line) {
    return !line;
  }

  isSingleLineComment(line) {
    return line.startsWith('//');
  }

  checkMultiLineCommentStarted(line) {
    line.startsWith('/*');
  }

  checkMultiLineCommentEnded(line) {
    line.endsWith('*/');
  }

  isImport(line) {
    let firstWord = line.split(' ')[0];
    console.log('firstWord', line, firstWord);
    return firstWord === 'import';
  }

  isVariableDeclarations(line) {
    let firstWord = line.split(' ')[0];
    return firstWord === 'const' || firstWord === 'let' || firstWord === 'var';
  }
}

export const JSUtils = new Utils();
