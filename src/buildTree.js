// @flow
import buildCommon from "./buildCommon";
import buildHTML from "./buildHTML";
import type {DomSpan} from "./domTree";
import Options from "./Options";
import type {AnyParseNode} from "./parseNode";
import Settings from "./Settings";
import Style from "./Style";


const optionsFromSettings = function(settings: Settings) {
    return new Options({
        style: (settings.displayMode ? Style.DISPLAY : Style.TEXT),
        maxSize: settings.maxSize,
        minRuleThickness: settings.minRuleThickness,
    });
};

const displayWrap = function(node: DomSpan, settings: Settings): DomSpan {
    if (settings.displayMode) {
        const classes = ["katex-display"];
        if (settings.leqno) {
            classes.push("leqno");
        }
        if (settings.fleqn) {
            classes.push("fleqn");
        }
        node = buildCommon.makeSpan(classes, [node]);
    }
    return node;
};

export const buildHTMLTree = function(
    tree: AnyParseNode[],
    expression: string,
    settings: Settings,
): DomSpan {
    const options = optionsFromSettings(settings);
    const htmlNode = buildHTML(tree, options);
    const katexNode = buildCommon.makeSpan(["katex"], [htmlNode]);
    return displayWrap(katexNode, settings);
};
