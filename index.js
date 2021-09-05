import replace from "@rollup/plugin-replace";
import {prompt} from "promptly";

export default (options) => {
    let values = Object.keys(options).includes("values") ? options.values : Object.entries(options).filter(([key]) => {
        return !["delimiters", "preventAssignment", "exclude", "include"].includes(key);
    }).reduce((carry, [key, value]) => {
        carry[key] = value;
        return carry;
    }, {});
    let promptValue;
    let replacePlugin;

    const ask = () => {
        if (promptValue === undefined) {
            promptValue = Promise.all(Object.entries(values).map(([search, promptText]) => {
                return prompt(promptText).then(value => {
                    values[search] = value;
                });
            }));
        }
        return promptValue;
    };

    const getReplacePlugin = () => {
        if (replacePlugin === undefined) {
            replacePlugin = Promise.resolve(ask()).then(() => {
                let newOptions = options;
                if (Object.keys(options).includes("values")) {
                    newOptions.values = values;
                } else {
                    Object.entries(values).forEach(([search, value]) => {
                        newOptions[search] = value;
                    });
                }
                return replace(newOptions);
            });
        }
        return replacePlugin;
    };

    return {
        name: "promptReplace",
        renderChunk() {
            return Promise.resolve(getReplacePlugin()).then(plugin => plugin.renderChunk(...arguments));
        },

        transform() {
            return Promise.resolve(getReplacePlugin()).then(plugin => plugin.transform(...arguments));
        }
    };
};