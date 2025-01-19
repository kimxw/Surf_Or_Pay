// import * as React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListSubheader from '@mui/material/ListSubheader';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Link from 'next/link'; // Use Next.js Link component
// import { format } from 'date-fns'; // Import date-fns for formatting

// // TaskDisplay component to show task details
// function TaskDisplay({ task }) { 
//   // Format the deadline for "Next Week" tasks to show date and time
//   const isNextWeek = task.deadline > new Date() && task.deadline <= new Date().setDate(new Date().getDate() + 7);

//   // Format the deadline based on whether it is Next Week or not
//   const formattedDeadline = isNextWeek
//     ? format(task.deadline, 'yyyy-MM-dd HH:mm')  // Display date and time for Next Week
//     : task.deadline instanceof Date
//     ? format(task.deadline, 'yyyy-MM-dd')        // Display date only for Today and Tomorrow
//     : task.deadline;

//   return (
//     <Box
//       sx={{
//         bgcolor: '#88C3D1',
//         padding: 1, // Reduced padding
//         borderRadius: 3,
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//         width: '100%', // Full width for tasks
//         '&:hover': {
//           bgcolor: '#B2EBF2',
//         },
//       }}
//     >
//       <Typography variant="h6" sx={{ color: '#1D5E6A', fontWeight: 'bold' }}>
//         {task.name}
//       </Typography>
//       <Typography variant="body2" sx={{ color: '#267984' }}>
//         Deadline: {formattedDeadline}
//       </Typography>
//       <Typography variant="body2" sx={{ color: '#BB4A4A', fontWeight: 'bold' }}>
//         Shark: {task.shark}
//       </Typography>
//       <Typography variant="body2" sx={{ color: '#BB4A4A' }}>
//         Forfeit: {task.forfeit}
//       </Typography>
//     </Box>
//   );
// }

// // Main list component
// export default function PinnedSubheaderList() {
//   // Example task data with full date and time
//   const tasks = [
//     { name: 'Submit report', deadline: new Date('2025-01-19T09:00:00'), shark: 'Loan Shark', forfeit: 'Late fee' },
//     { name: 'Prepare slides', deadline: new Date('2025-01-20T15:00:00'), shark: 'Boss Shark', forfeit: 'Lost opportunity' },
//     { name: 'Team meeting', deadline: new Date('2025-01-27T10:00:00'), shark: 'Peer Shark', forfeit: 'Missed input' },
//     { name: 'Update portfolio', deadline: new Date('2025-01-19T14:00:00'), shark: 'Career Shark', forfeit: 'Missed deadline' },
//     { name: 'Finalize app UI', deadline: new Date('2025-01-20T12:00:00'), shark: 'Client Shark', forfeit: 'Unsatisfied client' },
//   ];

//   const groupedTasks = {
//     Today: tasks.filter((task) => task.deadline.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]),
//     Tomorrow: tasks.filter((task) => {
//       const tomorrow = new Date();
//       tomorrow.setDate(tomorrow.getDate() + 1);
//       return task.deadline.toISOString().split('T')[0] === tomorrow.toISOString().split('T')[0];
//     }),
//     'Next Week': tasks.filter((task) => {
//       const nextWeekStart = new Date();
//       nextWeekStart.setDate(nextWeekStart.getDate() + 1); // Start of next week
//       const nextWeekEnd = new Date(nextWeekStart);
//       nextWeekEnd.setDate(nextWeekEnd.getDate() + 6); // End of next week

//       return task.deadline >= nextWeekStart && task.deadline <= nextWeekEnd;
//     }),
//     'Later': tasks.filter((task) => task.deadline > new Date(new Date().setDate(new Date().getDate() + 7))),
//   };

//   return (
//     <Box sx={{ position: 'relative' }}>
//       {/* Fixed button at the top */}
//       <Button
//         component={Link} // Using Next.js Link component
//         href="/MyOcean/SurferMode" // Link destination
//         variant="contained"
//         sx={{
//           position: 'absolute',
//           top: 12,
//           left: '50%',
//           transform: 'translateX(-50%)',
//           bgcolor: '#1D5E6A',
//           color: '#FFFFFF',
//           '&:hover': {
//             bgcolor: '#267984',
//           },
//         }}
//       >
//         Go to Surfer Mode
//       </Button>

//       <List
//         sx={{
//           width: '100%',
//           maxWidth: '100%',
//           bgcolor: '#267984',
//           position: 'relative',
//           overflow: 'auto',
//           maxHeight: 550,
//           borderRadius: 3,
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//           border: '1px solid #155B6C',
//           padding: 1,
//           marginTop: '0px', // Ensure button does not overlap
//           '& ul': { padding: 1 },
//           '&::-webkit-scrollbar': {
//             width: '10px',
//           },
//           '&::-webkit-scrollbar-track': {
//             background: '#1D5E6A',
//             borderRadius: 3,
//           },
//           '&::-webkit-scrollbar-thumb': {
//             background: '#88C3D1',
//             borderRadius: 3,
//           },
//           '&::-webkit-scrollbar-thumb:hover': {
//             background: '#B2EBF2',
//           },
//         }}
//         subheader={<li />}
//       >
//         {Object.entries(groupedTasks).map(([section, tasks]) => {
//           let backgroundColor = '#BB4A4A'; // Default to 'Today' color
//           if (section === 'Tomorrow') backgroundColor = '#DB8B5F';
//           if (section === 'Next Week') backgroundColor = '#B19C61';
//           if (section === 'Later') backgroundColor = '#A3A940';

//           return (
//             <li key={section}>
//               <ul>
//                 <ListSubheader
//                   sx={{
//                     backgroundColor: backgroundColor,
//                     color: '#FFFFFF',
//                     fontWeight: 'bold',
//                     textAlign: 'center',
//                     borderRadius: 3,
//                     padding: 1,
//                     width: '100%', // Make heading take full width
//                     boxSizing: 'border-box', // Ensure it fills the space
//                     margin: 0, // No margin on main headings
//                   }}
//                   className="lucky-guy" // Apply 'lucky-guy' font class
//                 >
//                   {section}
//                 </ListSubheader>
//                 {tasks.map((task, index) => (
//                   <ListItem key={index} disableGutters sx={{ padding: 1, margin: 0 }}>
//                     <TaskDisplay task={task} />
//                   </ListItem>
//                 ))}
//               </ul>
//             </li>
//           );
//         })}
//       </List>
//     </Box>
//   );
// }
