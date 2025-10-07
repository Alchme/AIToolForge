import React, { useState, useMemo } from 'react';
import type { ToolCategory, LibraryTool, ToolSubType } from '../types';
import ToolCard from './ToolCard';
import { SearchIcon, PlusIcon } from './Icons';

interface MarketplaceProps {
    toolCategories: ToolCategory[];
    onSelectTool: (tool: LibraryTool) => void;
    onCreateTool: () => void;
    onEditTool: (toolId: string) => void;
    onDeleteTool: (toolId: string) => void;
}

const allSubTypes: ToolSubType[] = ['Calculator', 'Converter', 'Generator', 'Assistant', 'Utility'];

const Marketplace: React.FC<MarketplaceProps> = ({ toolCategories, onSelectTool, onCreateTool, onEditTool, onDeleteTool }) => {
    const [activeTypeFilter, setActiveTypeFilter] = useState<ToolSubType | 'All'>('All');
    const [activeCategoryFilters, setActiveCategoryFilters] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const allToolsWithCategory = useMemo(() => {
        return toolCategories.flatMap(category =>
            category.tools.map(tool => ({ ...tool, categoryName: category.name }))
        );
    }, [toolCategories]);

    const filteredTools = useMemo(() => {
        return allToolsWithCategory
            .filter(tool => {
                const matchesCategory = activeCategoryFilters.length === 0 || activeCategoryFilters.includes(tool.categoryName);
                const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || tool.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesType = activeTypeFilter === 'All' || tool.subType === activeTypeFilter;
                return matchesCategory && matchesSearch && matchesType;
            })
            .sort((a, b) => {
                // Sort by usage count (most used first)
                return b.uses - a.uses;
            });
    }, [allToolsWithCategory, activeCategoryFilters, searchTerm, activeTypeFilter]);

    const handleCategoryChange = (categoryName: string) => {
        setActiveCategoryFilters(prev =>
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        );
    };

    return (
        <div className="flex-1 flex flex-col h-full">
            {/* Header */}
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 px-4 sm:px-8 border-b border-gray-800 bg-[#121212]/80 backdrop-blur-sm shrink-0 gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-white">Tool Marketplace</h1>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Explore the platform..."
                            className="bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-4 w-full sm:w-64 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                        onClick={onCreateTool}
                        className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 whitespace-nowrap">
                        <PlusIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">Create Tool</span>
                        <span className="sm:hidden">Create</span>
                    </button>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <p className="text-gray-400 max-w-4xl mb-6 sm:mb-8 text-sm sm:text-base">Discover and create custom tools that combine instructions, extra knowledge, and any combination of skills.</p>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Category Filters - Mobile: Horizontal scroll, Desktop: Sidebar */}
                    <div className="lg:w-56 lg:shrink-0">
                        <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
                        <div className="lg:space-y-3 flex lg:flex-col gap-3 lg:gap-0 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                            {toolCategories.map(category => (
                                <label key={category.name} className="flex items-center space-x-3 cursor-pointer whitespace-nowrap lg:whitespace-normal">
                                    <input
                                        type="checkbox"
                                        checked={activeCategoryFilters.includes(category.name)}
                                        onChange={() => handleCategoryChange(category.name)}
                                        className="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500 flex-shrink-0"
                                    />
                                    <span className="text-gray-300 text-sm lg:text-base">{category.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Main Grid Area */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>🔥</span>
                                <span>Sorted by popularity</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 bg-gray-800 p-1 rounded-lg overflow-x-auto w-full sm:w-auto">
                                <button
                                    onClick={() => setActiveTypeFilter('All')}
                                    className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${activeTypeFilter === 'All' ? 'bg-white text-gray-900' : 'text-gray-300 hover:bg-gray-700'}`}>
                                    All
                                </button>
                                {allSubTypes.map(subType => (
                                    <button
                                        key={subType}
                                        onClick={() => setActiveTypeFilter(subType)}
                                        className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${activeTypeFilter === subType ? 'bg-white text-gray-900' : 'text-gray-300 hover:bg-gray-700'}`}>
                                        {subType}s
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tool Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                            {filteredTools.map(tool => (
                                <ToolCard
                                    key={tool.id}
                                    tool={tool}
                                    onSelect={onSelectTool}
                                    categoryName={tool.categoryName}
                                    onEdit={onEditTool}
                                    onDelete={onDeleteTool}
                                />
                            ))}
                        </div>
                        {filteredTools.length === 0 && (
                            <div className="col-span-full text-center py-16 text-gray-500">
                                <h3 className="text-lg sm:text-xl font-semibold">No tools found</h3>
                                <p className="text-sm sm:text-base">Try adjusting your search or filter criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;