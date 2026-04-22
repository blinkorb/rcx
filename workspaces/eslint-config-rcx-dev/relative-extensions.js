const MATCHES_RELATIVE_PATH = /^\.\.?\//;
const MATCHES_JS_EXTENSION = /\.js$/;
const MATCHES_MAYBE_EXTENSION = /^(.+?)(?:\.[tj]sx?)?(['"])$/;

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Relative imports/exports must include a ".js" extension',
    },
    fixable: 'code',
    messages: {
      missingExtensionJs:
        '{{ importPath }} is relative and should include a ".js" extension',
    },
    schema: [], // no options
  },
  create(context) {
    return {
      ExportAllDeclaration(node) {
        if (
          node.source &&
          MATCHES_RELATIVE_PATH.test(node.source.value) &&
          !MATCHES_JS_EXTENSION.test(node.source.value)
        ) {
          context.report({
            node,
            messageId: 'missingExtensionJs',
            data: {
              importPath: node.source.value,
            },
            fix(fixer) {
              return fixer.replaceText(
                node.source,
                node.source.raw.replace(MATCHES_MAYBE_EXTENSION, '$1.js$2')
              );
            },
          });
        }
      },
      ExportNamedDeclaration(node) {
        if (
          node.source &&
          MATCHES_RELATIVE_PATH.test(node.source.value) &&
          !MATCHES_JS_EXTENSION.test(node.source.value)
        ) {
          context.report({
            node,
            messageId: 'missingExtensionJs',
            data: {
              importPath: node.source.value,
            },
            fix(fixer) {
              return fixer.replaceText(
                node.source,
                node.source.raw.replace(MATCHES_MAYBE_EXTENSION, '$1.js$2')
              );
            },
          });
        }
      },
      ImportDeclaration(node) {
        if (
          node.source &&
          MATCHES_RELATIVE_PATH.test(node.source.value) &&
          !MATCHES_JS_EXTENSION.test(node.source.value)
        ) {
          context.report({
            node,
            messageId: 'missingExtensionJs',
            data: {
              importPath: node.source.value,
            },
            fix(fixer) {
              return fixer.replaceText(
                node.source,
                node.source.raw.replace(MATCHES_MAYBE_EXTENSION, '$1.js$2')
              );
            },
          });
        }
      },
    };
  },
};
