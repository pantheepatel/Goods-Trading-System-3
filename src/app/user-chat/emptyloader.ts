import { TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

// Loader that returns empty translations
export class EmptyTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return of({});
    }
}

// Compiler that does nothing (no translation compilation)
export class EmptyCompiler implements TranslateCompiler {
    compile(value: string, lang: string): string {
        return value; // Return the value as-is
    }

    compileTranslations(translations: any, lang: string): any {
        return translations; // Return translations as-is
    }
}

// Parser that returns raw values without modification
export class EmptyParser implements TranslateParser {
    interpolate(expr: string | Function, params?: any): string {
        return typeof expr === 'function' ? expr(params) : expr;
    }

    getValue(target: any, key: string): any {
        return target?.[key] ?? key;
    }
}
export class EmptyMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: any): string {
        return params.key; // Return the key itself if the translation is missing
    }
}