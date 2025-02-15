import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

interface DueDate {
  day: number;
  month: number;
  year: number;
}

interface Task {
  id: number;
  name: string;
  dueDate: DueDate;
  status: 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED';
  category: 'Work' | 'Personal';
}

interface TaskCardProps {
  task: Task;
  setAnchorElEditDelete: React.Dispatch<React.SetStateAction<{ anchor: HTMLElement | null; id: number | null }>>;
  handleDeleteTask: (id: number, setTasks: any) => void;
  setTasks: React.Dispatch<React.SetStateAction<{ [key: string]: Task[] }>>;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, setAnchorElEditDelete, handleDeleteTask, setTasks }) => {
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElEditDelete({ anchor: event.currentTarget, id: task.id });
  };

  const handleDelete = () => {
    handleDeleteTask(task.id, setTasks);
  };

  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        <Typography variant="h6">{task.name}</Typography>
        <Typography variant="body2">
          Due: {task.dueDate.day}/{task.dueDate.month}/{task.dueDate.year}
        </Typography>
        <IconButton onClick={handleMenuClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorEl={null}
          open={false}
          onClose={() => setAnchorElEditDelete({ anchor: null, id: null })}
        >
          <MenuItem>
            <BorderColorIcon /> Edit
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteIcon /> Delete
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
