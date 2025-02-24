import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../lib/icon";
import { Button } from "../ui/button";
import "./treeStructure.css";
import Trash from "../Trash/Trash";
import { DeleteCategory } from "../../lib/endPointes/Categorys/DeleteCategory";
import AddCategory from "../../pages/Products/Modals/addCategory/AddCategory";
import Spinner from "../../common/loading/spinner";
import doesTextFitInContainer from "../../lib/doestTextFitIncontainer";
import TooltipProvider from "../../common/Tooltips";
import Toast from "../Toast/Toast";
import EditCategory from "../../pages/Products/Modals/editCategory/EditeCategory";
import AlertDialogModal from "../AlertDialog/AlertDialog";
import Mark from "mark.js"
interface TreeItem {
    id: number;
    name: string;
    isLeaf: boolean;
    children: TreeItem[];
    parentId?: number | null;
}

interface TreeStructureProps {
    treeItems: TreeItem[];
    handleDeleteCategory: (categoryId: number) => void;
    handleAddCategory: (newCategory: TreeItem) => void;
    handleEditCategory: (updatedCategory: { id: number; name: string }) => void;
    changeCategory: (id: number) => void;
    IsLoadingCategory?: boolean;
    searchValue?: string;
}

const TreeStructure = ({
    treeItems,
    handleDeleteCategory,
    handleAddCategory,
    handleEditCategory,
    changeCategory,
    IsLoadingCategory,
    searchValue,
}: any) => {

    const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>(() => {
        if (typeof window !== 'undefined') {
            const storedExpandedNodes = localStorage.getItem('expandedNodes');
            return storedExpandedNodes ? JSON.parse(storedExpandedNodes) : {};
        }
        return {};
    });
    const [selectedNode, setSelectedNode] = useState<number | null>(() => {
        if (typeof window !== 'undefined') {
            const storedSelectedNode = localStorage.getItem('selectedNode');
            return storedSelectedNode ? JSON.parse(storedSelectedNode) : null;
        }
        return null;
    });
    const NotFoundSearch = `دسته ای به اسم "${searchValue}" یافت نشد!`

    //Highlite search term using mark.js
    useEffect(() => {
        if (searchValue) {
            const container = document.querySelector('.tree-container')
            if (container) {
                const markInstance = new Mark(container)
                markInstance.unmark();
                markInstance.mark(searchValue, {
                    className: 'highlight',
                    acrossElements: true,
                    ignoreJoiners: true,
                    caseSensitive: false
                })
            }
        }
    }, [searchValue, treeItems])

    useEffect(() => {
        localStorage.setItem('selectedNode', JSON.stringify(selectedNode));
    }, [selectedNode]);

    useEffect(() => {
        localStorage.setItem('expandedNodes', JSON.stringify(expandedNodes));
    }, [expandedNodes]);

    const toggleNode = useCallback((nodeId: number) => {
        setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
    }, []);

    const handleNodeSelect = useCallback(
        (nodeId: number) => {
            setSelectedNode((prev) => (prev === nodeId ? null : nodeId));
            changeCategory(nodeId);
        },
        [changeCategory]
    );

    const findParentId = (nodeId: number, nodes: TreeItem[], parentId: number | null = null): number | null => {
        for (const node of nodes) {
            if (node.children.some((child) => child.id === nodeId)) {
                return node.id;
            }
            const foundParentId = findParentId(nodeId, node.children, node.id);
            if (foundParentId !== null) {
                return foundParentId;
            }
        }
        return null;
    };

    useEffect(() => {
        if (selectedNode !== null) {
            const expandParents = (nodeId: number, nodes: TreeItem[]): void => {
                for (const node of nodes) {
                    if (node.children.some((child) => child.id === nodeId)) {
                        setExpandedNodes((prev) => ({ ...prev, [node.id]: true }));
                        expandParents(node.id, treeItems);
                        break;
                    } else if (node.children.length > 0) {
                        expandParents(nodeId, node.children);
                    }
                }
            };
            expandParents(selectedNode, treeItems);
        }
    }, [selectedNode, treeItems]);

    const renderTree = useCallback(
        (node: TreeItem): JSX.Element => {
            const isExpanded = expandedNodes[node.id];
            const hasChildren = node.children.length > 0;
            const isSelected = selectedNode === node.id;

            const containerWidth = 150; // Adjust based on your UI container width
            const doesFit = doesTextFitInContainer(node.name, containerWidth);
            const truncatedText = doesFit ? node.name : node.name.slice(0, 10) + "..."; // Adjust slice length if needed

            const deleteCategory = async () => {
                handleDeleteCategory(node.id);
                Toast({ message:'حذف با موفقیت انجام شد', type: 'success' });
                // try {
                //     const response = await DeleteCategory({ id: node.id });
                //     if (response.data.isSuccessful) {
                //         response?.data?.getMessageText.map((message: string) => {
                //             Toast({ message, type: 'success' });
                //         });
                //     }
                // } catch (error: any) {
                //     Toast({ message: error?.message, type: 'error' });
                // }
            };

            return (
                <div key={node.id} className="group text-[17px] text-right text-black_5 flex flex-col gap-3 ">
                    <div className={`flex  w-full justify-between items-center parent truncate rounded-[8px] px-[5px]   ${isSelected ? "bg-MainColor text-gray_45 hover:bg-HoverTreeItem border border-sidebarBackground" : "hover:bg-HoverTreeItem hover:gray_45"}`}>
                        <div
                            role="button"
                            tabIndex={0}
                            aria-expanded={isExpanded}
                            aria-selected={isSelected}
                            className={`flex justify-between  items-center px-2 rounded-[12px] h-[26px] cursor-pointer 
                                `}
                        >
                            <div className="flex items-center ">
                                {node.isLeaf ? (
                                    <Icon icon="Ellipse" style={{ fill: "red" }} className={`w-[5px] h-[5px] ${isSelected && "text-white"}`} />
                                ) : hasChildren ? (
                                    <Icon icon={isExpanded ? "down" : "chevron-left"} className="w-3 h-3"
                                        onClick={() => toggleNode(node.id)} />
                                ) : null}
                                <TooltipProvider content={node.name} isShowTooltip={doesFit} delay={700}>
                                    <span
                                        onClick={() => {
                                            handleNodeSelect(node.id);
                                        }}
                                        className={`mr-1 text-sm truncate ${node.parentId === null && 'font-bold'}`}>{node.fullCode} - {truncatedText}</span>
                                </TooltipProvider>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2 icon  ">
                            <AddCategory info={node} onAddCategory={handleAddCategory} />
                            {node.isEditable && <EditCategory
                                gateGoryInfo={node.name}
                                info={{ ...node, parentId: findParentId(node.id, treeItems) }}
                                onEditSuccess={handleEditCategory}
                            />}
                            {node.isDeletable && <AlertDialogModal
                                cancelText="انصراف"
                                confirmText="حذف"
                                trigger={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="w-[22px] h-[19px] flex-shrink-0 rounded-[7px] "
                                    >
                                        <i className="icon-trash text-black"></i>
                                    </Button>
                                }
                                onConfirm={deleteCategory}
                            >
                                <Trash
                                    describtion={
                                        <span className="text-[14px]">
                                            آیا از حذف دسته <span>"{node.name}"</span> مطمئن هستید؟
                                        </span>
                                    }
                                />
                            </AlertDialogModal>}
                        </div>
                    </div>
                    <AnimatePresence>
                        { hasChildren && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mr-6 h-full flex flex-col gap-2"
                            >
                                {node.children.map((child) => renderTree(child))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            );
        },
        [expandedNodes, selectedNode, toggleNode, handleNodeSelect, treeItems]
    );

    if (treeItems?.length === 0 && !IsLoadingCategory) {
        return (
            <div className="text-black_5 text-center">{NotFoundSearch}</div>
        )
    }

    return IsLoadingCategory ? <Spinner /> : <div className="gap-3 flex flex-col tree-container ">{treeItems?.map((rootNode: any) => renderTree(rootNode))}</div>;
};

export default TreeStructure;
