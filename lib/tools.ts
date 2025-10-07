
import type { ToolCategory, LibraryTool } from '../types';

// Finance Tools
import { loanCalculator } from './tools/finance/loanCalculator';
import { tipCalculator } from './tools/finance/tipCalculator';
import { investmentCalculator } from './tools/finance/investmentCalculator';
import { budgetPlanner } from './tools/finance/budgetPlanner';
import { currencyConverter } from './tools/finance/currencyConverter';
import { mortgageCalculator } from './tools/finance/mortgageCalculator';
import { salaryCalculator } from './tools/finance/salaryCalculator';
import { savingsGoalCalculator } from './tools/finance/savingsGoalCalculator';
import { inflationCalculator } from './tools/finance/inflationCalculator';
import { retirementCalculator } from './tools/finance/retirementCalculator';

// Converter Tools
import { unitConverter } from './tools/converters/unitConverter';
import { dataStorageConverter } from './tools/converters/dataStorageConverter';
import { colorCodeConverter } from './tools/converters/colorCodeConverter';
import { romanNumeralConverter } from './tools/converters/romanNumeralConverter';
import { baseConverter } from './tools/converters/baseConverter';
import { caseConverter } from './tools/converters/caseConverter';
import { cookingConverter } from './tools/converters/cookingConverter';
import { speedConverter } from './tools/converters/speedConverter';
import { angleConverter } from './tools/converters/angleConverter';
import { timeZoneConverter } from './tools/converters/timeZoneConverter';

// Developer Tools
import { colorPaletteGenerator } from './tools/developer/colorPaletteGenerator';
import { passwordGenerator } from './tools/developer/passwordGenerator';
import { regexAssistant } from './tools/developer/regexAssistant';
import { jsonFormatter } from './tools/developer/jsonFormatter';
import { urlEncoder } from './tools/developer/urlEncoder';
import { base64Encoder } from './tools/developer/base64Encoder';
import { loremIpsumGenerator } from './tools/developer/loremIpsumGenerator';
import { cssGradientGenerator } from './tools/developer/cssGradientGenerator';
import { uuidGenerator } from './tools/developer/uuidGenerator';
import { markdownPreviewer } from './tools/developer/markdownPreviewer';

// Productivity Tools
import { emailResponder } from './tools/productivity/emailResponder';
import { todoList } from './tools/productivity/todoList';
import { creativeWriter } from './tools/productivity/creativeWriter';
import { pomodoroTimer } from './tools/productivity/pomodoroTimer';
import { simpleNotepad } from './tools/productivity/simpleNotepad';
import { wordCounter } from './tools/productivity/wordCounter';
import { decisionWheel } from './tools/productivity/decisionWheel';
import { habitTracker } from './tools/productivity/habitTracker';
import { meetingCostCalculator } from './tools/productivity/meetingCostCalculator';
import { timeTracker } from './tools/productivity/timeTracker';

// Text & Writing Tools
import { proofreader } from './tools/text/proofreader';
import { textSummarizer } from './tools/text/textSummarizer';
import { translationTool } from './tools/text/translationTool';
import { resumeBuilder } from './tools/text/resumeBuilder';
import { coverLetterGenerator } from './tools/text/coverLetterGenerator';
import { blogPostIdeaGenerator } from './tools/text/blogPostIdeaGenerator';
import { keywordExtractor } from './tools/text/keywordExtractor';
import { readabilityScore } from './tools/text/readabilityScore';
import { plagiarismChecker } from './tools/text/plagiarismChecker';
import { citationGenerator } from './tools/text/citationGenerator';

// Image & Design Tools
import { imageGenerator } from './tools/image/imageGenerator';
import { imageCompressor } from './tools/image/imageCompressor';
import { imageResizer } from './tools/image/imageResizer';
import { imageFormatConverter } from './tools/image/imageFormatConverter';
import { backgroundRemover } from './tools/image/backgroundRemover';
import { memeGenerator } from './tools/image/memeGenerator';
import { faviconGenerator } from './tools/image/faviconGenerator';
import { logoMaker } from './tools/image/logoMaker';
import { watermarkAdder } from './tools/image/watermarkAdder';
import { aspectRatioCalculator } from './tools/image/aspectRatioCalculator';
import { svgToPngConverter } from './tools/image/svgToPngConverter';

// Data & Analytics Tools
import { csvToJsonConverter } from './tools/data/csvToJsonConverter';
import { dataVisualizer } from './tools/data/dataVisualizer';
import { qrCodeGenerator } from './tools/data/qrCodeGenerator';
import { statisticsCalculator } from './tools/data/statisticsCalculator';
import { abTestCalculator } from './tools/data/abTestCalculator';
import { jsonToCsvConverter } from './tools/data/jsonToCsvConverter';
import { xmlToJsonConverter } from './tools/data/xmlToJsonConverter';
import { dataScrubber } from './tools/data/dataScrubber';
import { randomDataGenerator } from './tools/data/randomDataGenerator';
import { correlationCalculator } from './tools/data/correlationCalculator';


export const toolCategories: ToolCategory[] = [
    {
        name: 'Finance',
        tools: [
            loanCalculator,
            tipCalculator,
            investmentCalculator,
            budgetPlanner,
            currencyConverter,
            mortgageCalculator,
            salaryCalculator,
            savingsGoalCalculator,
            inflationCalculator,
            retirementCalculator
        ] as LibraryTool[]
    },
    {
        name: 'Converters',
        tools: [
            unitConverter,
            dataStorageConverter,
            colorCodeConverter,
            romanNumeralConverter,
            baseConverter,
            caseConverter,
            cookingConverter,
            speedConverter,
            angleConverter,
            timeZoneConverter
        ] as LibraryTool[]
    },
    {
        name: 'Developer Tools',
        tools: [
            colorPaletteGenerator,
            passwordGenerator,
            regexAssistant,
            jsonFormatter,
            urlEncoder,
            base64Encoder,
            loremIpsumGenerator,
            cssGradientGenerator,
            uuidGenerator,
            markdownPreviewer
        ] as LibraryTool[]
    },
    {
        name: 'Productivity',
        tools: [
            emailResponder,
            todoList,
            creativeWriter,
            pomodoroTimer,
            simpleNotepad,
            wordCounter,
            decisionWheel,
            habitTracker,
            meetingCostCalculator,
            timeTracker
        ] as LibraryTool[]
    },
    {
        name: 'Text & Writing Tools',
        tools: [
            proofreader,
            textSummarizer,
            translationTool,
            resumeBuilder,
            coverLetterGenerator,
            blogPostIdeaGenerator,
            keywordExtractor,
            readabilityScore,
            plagiarismChecker,
            citationGenerator,
        ] as LibraryTool[]
    },
    {
        name: 'Image & Design Tools',
        tools: [
            imageGenerator,
            imageCompressor,
            imageResizer,
            imageFormatConverter,
            backgroundRemover,
            memeGenerator,
            faviconGenerator,
            logoMaker,
            watermarkAdder,
            aspectRatioCalculator,
            svgToPngConverter
        ] as LibraryTool[]
    },
    {
        name: 'Data & Analytics Tools',
        tools: [
            csvToJsonConverter,
            dataVisualizer,
            qrCodeGenerator,
            statisticsCalculator,
            abTestCalculator,
            jsonToCsvConverter,
            xmlToJsonConverter,
            dataScrubber,
            randomDataGenerator,
            correlationCalculator
        ] as LibraryTool[]
    }
];
