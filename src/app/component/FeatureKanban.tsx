"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { XCircle, CheckCircle, AlertTriangle, Clock } from "lucide-react";

type Feature = { name: string; timeEstimate?: string };

const columns = ["To Do", "Working", "Done"] as const;
type Column = (typeof columns)[number];

export default function FeatureKanban({ features }: { features: Feature[] }) {
  const [tasks, setTasks] = useState<Record<Column, Feature[]>>({
    "To Do": features,
    Working: [],
    Done: [],
  });

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) return;

    const srcCol = source.droppableId as Column;
    const destCol = destination.droppableId as Column;
    const srcTasks = Array.from(tasks[srcCol]);
    const [moved] = srcTasks.splice(source.index, 1);
    const destTasks = Array.from(tasks[destCol]);
    destTasks.splice(destination.index, 0, moved);

    setTasks({
      ...tasks,
      [srcCol]: srcTasks,
      [destCol]: destTasks,
    });
  }

  // Icon per column (instead of colored dot)
  function getStatusIcon(col: Column) {
    switch (col) {
      case "To Do":
        return <XCircle className="w-4 h-4 text-red-500" />; // cross for "To Do"
      case "Working":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />; // in-progress icon
      case "Done":
        return <CheckCircle className="w-4 h-4 text-green-500" />; // check for "Done"
      default:
        return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div key={col} className="flex flex-col">
            {/* Column title above the board */}
            <div className="mb-2">
              <h2 className="text-lg font-bold mt-4 text-center font-semibold text-gray-300">{col}</h2>
            </div>

            <Droppable droppableId={col} key={col}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-2xl shadow-md border border-gray-800 min-h-[350px] bg-gray-900 transition ${
                    snapshot.isDraggingOver ? "bg-gray-800" : ""
                  }`}
                >
                  {tasks[col].map((task, idx) => (
                    <Draggable key={task.name} draggableId={task.name} index={idx}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 mb-3 rounded-xl border border-gray-700 bg-gray-800 flex items-center justify-between transition ${
                            snapshot.isDragging ? "bg-gray-700" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {/* Status icon replaces colored dot */}
                            <div aria-hidden>{getStatusIcon(col as Column)}</div>
                            <div>
                              <p className="font-medium text-gray-100">{task.name}</p>
                              {task.timeEstimate && (
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                                  <span>{task.timeEstimate}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
