import {FJS} from "../../../framework/f.mjs";

export class GenericTemplates {
    static testChild = () => {
        return FJS.create("span")
            .classes('border')
            .text('test child').build();
    };
    static test = testClass => {
        return FJS.create("span")
            .classes(testClass, 'border')
            .attributes('data-test', 'test', 'data-test2', 'test2')
            .text('test text')
            .onclick(() => {
                console.log('test');
            })
            .children(GenericTemplates.testChild())
            .build();
    };
}
