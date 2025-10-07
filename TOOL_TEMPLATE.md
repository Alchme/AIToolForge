# 🛠️ Tool Development Template & Guide

Welcome to the ToolFORGE tool development guide! This document will help you create amazing tools that integrate seamlessly with our platform. Whether you're building a simple converter or a complex AI-powered utility, this template has you covered.

## 📋 Table of Contents

- [🎯 Tool Categories](#-tool-categories)
- [📁 File Structure](#-file-structure)
- [🔧 Basic Tool Template](#-basic-tool-template)
- [🎨 UI Components & Styling](#-ui-components--styling)
- [📊 Advanced Features](#-advanced-features)
- [✅ Best Practices](#-best-practices)
- [🧪 Testing Your Tool](#-testing-your-tool)
- [📝 Documentation](#-documentation)
- [🚀 Submission Guidelines](#-submission-guidelines)

---

## 🎯 Tool Categories

Choose the category that best fits your tool:

### 🔄 **Converters**
Tools that transform data from one format to another
- **Examples**: Unit converter, color converter, base converter
- **Location**: `lib/tools/converters/`

### 📊 **Data & Analytics**
Tools for data processing, analysis, and visualization
- **Examples**: CSV parser, statistics calculator, data visualizer
- **Location**: `lib/tools/data/`

### 💻 **Developer Tools**
Utilities specifically for developers and programmers
- **Examples**: JSON formatter, regex tester, UUID generator
- **Location**: `lib/tools/developer/`

### 💰 **Finance Tools**
Financial calculators and money-related utilities
- **Examples**: Loan calculator, budget planner, currency converter
- **Location**: `lib/tools/finance/`

### 🖼️ **Image & Media**
Tools for image processing and media manipulation
- **Examples**: Image compressor, format converter, meme generator
- **Location**: `lib/tools/image/`

### 📝 **Productivity**
Tools to help users be more productive and organized
- **Examples**: Todo list, time tracker, note-taking
- **Location**: `lib/tools/productivity/`

### 📚 **Text & Content**
Tools for text processing, writing, and content creation
- **Examples**: Text summarizer, grammar checker, citation generator
- **Location**: `lib/tools/text/`

---

## 📁 File Structure

Each tool should follow this structure:

```
lib/tools/[category]/
├── yourToolName.ts          # Main tool implementation
├── yourToolName.test.ts     # Unit tests (optional but recommended)
└── README.md               # Tool-specific documentation (optional)
```

---

## 🔧 Basic Tool Template

Here's the complete template for creating a new tool:

```typescript
// lib/tools/[category]/yourToolName.ts

import React, { useState, useCallback } from 'react';
import type { StaticTool } from '../../types';
import * as Icons from '../../components/Icons';

// Define your tool's interface for type safety
interface YourToolState {
  input: string;
  output: string;
  // Add other state properties as needed
}

interface YourToolConfig {
  // Add configuration options if needed
  precision?: number;
  format?: string;
}

// Main tool component
const YourToolComponent: React.FC = () => {
  // State management
  const [state, setState] = useState<YourToolState>({
    input: '',
    output: '',
  });
  
  const [config, setConfig] = useState<YourToolConfig>({
    precision: 2,
    format: 'default',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main processing function
  const processInput = useCallback(async (inputValue: string) => {
    if (!inputValue.trim()) {
      setState(prev => ({ ...prev, output: '' }));
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Your tool's main logic goes here
      const result = await yourProcessingFunction(inputValue, config);
      
      setState(prev => ({
        ...prev,
        output: result
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setState(prev => ({ ...prev, output: '' }));
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  // Handle input changes
  const handleInputChange = useCallback((value: string) => {
    setState(prev => ({ ...prev, input: value }));
    processInput(value);
  }, [processInput]);

  // Copy to clipboard functionality
  const copyToClipboard = useCallback(async () => {
    if (!state.output) return;
    
    try {
      await navigator.clipboard.writeText(state.output);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }, [state.output]);

  // Clear all inputs and outputs
  const clearAll = useCallback(() => {
    setState({ input: '', output: '' });
    setError(null);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Tool Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Your Tool Name</h1>
        <p className="text-gray-400">Brief description of what your tool does</p>
      </div>

      {/* Configuration Section (if needed) */}
      <div className="bg-gray-800 rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold text-white">Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Precision
            </label>
            <select
              value={config.precision}
              onChange={(e) => setConfig(prev => ({ ...prev, precision: Number(e.target.value) }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>0 decimal places</option>
              <option value={1}>1 decimal place</option>
              <option value={2}>2 decimal places</option>
              <option value={3}>3 decimal places</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Input/Output Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Input</h3>
            <button
              onClick={clearAll}
              className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors"
            >
              Clear
            </button>
          </div>
          
          <textarea
            value={state.input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter your input here..."
            className="w-full h-40 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          
          {/* Input validation or helper text */}
          <p className="text-sm text-gray-400">
            Enter the data you want to process
          </p>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Output</h3>
            <button
              onClick={copyToClipboard}
              disabled={!state.output}
              className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-400 text-white rounded-md transition-colors"
            >
              Copy
            </button>
          </div>
          
          <div className="relative">
            <textarea
              value={state.output}
              readOnly
              placeholder={isLoading ? "Processing..." : "Output will appear here..."}
              className="w-full h-40 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none resize-none"
            />
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
          
          {/* Error display */}
          {error && (
            <div className="p-3 bg-red-900 bg-opacity-50 border border-red-700 rounded-md">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Features Section (optional) */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Additional Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors">
            Feature 1
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors">
            Feature 2
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors">
            Feature 3
          </button>
        </div>
      </div>

      {/* Usage Examples or Help Section */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">How to Use</h3>
        <div className="space-y-2 text-gray-300">
          <p>1. Enter your input in the left panel</p>
          <p>2. Adjust settings if needed</p>
          <p>3. View the processed output on the right</p>
          <p>4. Copy the result to your clipboard</p>
        </div>
      </div>
    </div>
  );
};

// Your processing function (separate for testability)
async function yourProcessingFunction(
  input: string, 
  config: YourToolConfig
): Promise<string> {
  // Implement your tool's core logic here
  // This function should be pure and testable
  
  // Example processing:
  if (!input.trim()) {
    throw new Error('Input cannot be empty');
  }
  
  // Your actual processing logic
  const result = input.toUpperCase(); // Example transformation
  
  return result;
}

// Tool definition for the platform
const yourToolName: StaticTool = {
  id: 'your-tool-name',
  name: 'Your Tool Name',
  description: 'Brief description of what your tool does and why it\'s useful',
  icon: Icons.YourChosenIcon, // Choose an appropriate icon from Icons
  iconName: 'YourChosenIcon',
  type: 'static',
  subType: 'Utility', // or 'Converter', 'Calculator', etc.
  author: 'Your Name',
  uses: 0,
  html: `
    <div id="your-tool-root"></div>
    <script type="module">
      import React from 'react';
      import ReactDOM from 'react-dom/client';
      
      // Your component would be rendered here
      const root = ReactDOM.createRoot(document.getElementById('your-tool-root'));
      root.render(React.createElement(YourToolComponent));
    </script>
  `
};

export default yourToolName;
```

---

## 🎨 UI Components & Styling

### **Color Palette**
Use these consistent colors throughout your tool:

```css
/* Background Colors */
bg-gray-900    /* Main background */
bg-gray-800    /* Card backgrounds */
bg-gray-700    /* Input backgrounds */

/* Text Colors */
text-white     /* Primary text */
text-gray-300  /* Secondary text */
text-gray-400  /* Placeholder text */

/* Accent Colors */
bg-blue-600    /* Primary buttons */
bg-green-600   /* Success states */
bg-red-600     /* Error states */
bg-yellow-600  /* Warning states */
```

### **Common Components**

**Input Field:**
```jsx
<input
  type="text"
  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="Enter text..."
/>
```

**Button:**
```jsx
<button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
  Action
</button>
```

**Card Container:**
```jsx
<div className="bg-gray-800 rounded-lg p-4 space-y-4">
  {/* Content */}
</div>
```

---

## 📊 Advanced Features

### **File Upload Support**
```jsx
const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target?.result as string;
    handleInputChange(content);
  };
  reader.readAsText(file);
}, [handleInputChange]);

// In your JSX:
<input
  type="file"
  onChange={handleFileUpload}
  accept=".txt,.json,.csv" // Specify accepted file types
  className="hidden"
  id="file-upload"
/>
<label
  htmlFor="file-upload"
  className="cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
>
  Upload File
</label>
```

### **Download Results**
```jsx
const downloadResult = useCallback(() => {
  if (!state.output) return;
  
  const blob = new Blob([state.output], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'result.txt'; // Customize filename
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}, [state.output]);
```

### **Local Storage Persistence**
```jsx
// Save state to localStorage
useEffect(() => {
  localStorage.setItem('yourTool_config', JSON.stringify(config));
}, [config]);

// Load state from localStorage
useEffect(() => {
  const saved = localStorage.getItem('yourTool_config');
  if (saved) {
    try {
      setConfig(JSON.parse(saved));
    } catch (error) {
      console.error('Failed to load saved config:', error);
    }
  }
}, []);
```

---

## ✅ Best Practices

### **Performance**
- ✅ Use `useCallback` for event handlers
- ✅ Use `useMemo` for expensive calculations
- ✅ Debounce input processing for real-time tools
- ✅ Handle large inputs gracefully

### **Error Handling**
- ✅ Always validate inputs
- ✅ Provide clear error messages
- ✅ Handle edge cases gracefully
- ✅ Never crash the entire application

### **User Experience**
- ✅ Provide loading indicators
- ✅ Show progress for long operations
- ✅ Include helpful placeholder text
- ✅ Add keyboard shortcuts where appropriate

### **Accessibility**
- ✅ Use semantic HTML elements
- ✅ Provide proper ARIA labels
- ✅ Ensure keyboard navigation works
- ✅ Maintain good color contrast

### **Code Quality**
- ✅ Write TypeScript interfaces for all data
- ✅ Keep functions pure and testable
- ✅ Use meaningful variable names
- ✅ Add comments for complex logic

---

## 🧪 Testing Your Tool

### **Manual Testing Checklist**
- [ ] Tool loads without errors
- [ ] All inputs accept expected data types
- [ ] Error handling works for invalid inputs
- [ ] Copy/paste functionality works
- [ ] Mobile responsiveness is good
- [ ] Loading states display correctly

### **Unit Tests (Optional)**
```typescript
// lib/tools/[category]/yourToolName.test.ts

import { yourProcessingFunction } from './yourToolName';

describe('Your Tool Name', () => {
  test('processes valid input correctly', async () => {
    const result = await yourProcessingFunction('test input', { precision: 2 });
    expect(result).toBe('TEST INPUT');
  });

  test('throws error for empty input', async () => {
    await expect(yourProcessingFunction('', { precision: 2 }))
      .rejects.toThrow('Input cannot be empty');
  });
});
```

---

## 📝 Documentation

### **Tool README (Optional)**
Create a `README.md` in your tool's directory:

```markdown
# Your Tool Name

Brief description of what your tool does.

## Features
- Feature 1
- Feature 2
- Feature 3

## Usage
1. Step 1
2. Step 2
3. Step 3

## Examples
- Example input → Example output

## Technical Details
- Algorithm used
- Performance characteristics
- Limitations
```

---

## 🚀 Submission Guidelines

### **Before Submitting**
1. ✅ Test your tool thoroughly
2. ✅ Follow the coding standards
3. ✅ Add your tool to the appropriate category
4. ✅ Update the tool registry if needed
5. ✅ Write clear commit messages

### **Pull Request Template**
```markdown
## Tool Submission: [Your Tool Name]

### Description
Brief description of what your tool does and why it's useful.

### Category
- [ ] Converters
- [ ] Data & Analytics  
- [ ] Developer Tools
- [ ] Finance Tools
- [ ] Image & Media
- [ ] Productivity
- [ ] Text & Content

### Features
- Feature 1
- Feature 2
- Feature 3

### Testing
- [ ] Manual testing completed
- [ ] Works on mobile devices
- [ ] Error handling tested
- [ ] Performance is acceptable

### Screenshots (if applicable)
[Add screenshots of your tool in action]
```

---

## 🎉 Congratulations!

You're now ready to create amazing tools for the ToolFORGE platform! Remember:

- **Start simple** - Build a basic version first, then add features
- **Focus on UX** - Make it intuitive and helpful
- **Test thoroughly** - Ensure it works reliably
- **Ask for help** - The community is here to support you

Happy coding! 🚀

---

## 📞 Need Help?

- **GitHub Issues** - For technical questions
- **Discord** - For real-time help and discussion
- **Documentation** - Check existing tools for examples
- **Code Review** - Submit a draft PR for feedback

*Made with ❤️ for the ToolFORGE community*