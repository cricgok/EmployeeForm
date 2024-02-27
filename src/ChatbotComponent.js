import React from 'react';
import ChatBot from 'react-simple-chatbot';

const ChatbotComponent = () => {
    const handleUserQuery = async (query) => {
        try {
          let responseMessage = '';
      
          // Constructing the database query dynamically based on user input
          const response = await fetch(`/query-employee?query=${encodeURIComponent(query)}`);
          if (!response.ok) {
            throw new Error('Failed to fetch employee details');
          }
          const data = await response.json();
      
          // Generating the response message based on the retrieved data
          if (data.length > 0) {
            responseMessage = data.map(employee => {
              // Construct the response message based on the retrieved employee data
              // For example, you can include name, salary, address, etc.
              return `${employee.name}: Salary - ${employee.salary}, Address - ${employee.address}, Designation - ${employee.designation}`;
            }).join('\n');
          } else {
            responseMessage = 'No matching employee found.';
          }
      
          return responseMessage;
        } catch (error) {
          console.error('Error querying employee:', error.message);
          return 'An error occurred while fetching employee details';
        }
      };
      
      
      
  return (
    <ChatBot
      steps={[
        {
          id: '1',
          message: 'Welcome! How can I assist you?',
          trigger: 'user-query',
        },
        {
          id: 'user-query',
          user: true,
          trigger: 'fetch-employee-details',
        },
        {
          id: 'fetch-employee-details',
          message: 'Fetching employee details...',
          trigger: 'display-employee-details',
          // Function to fetch employee details from the backend
          asyncScript: async (previousSteps) => {
            const userQuery = previousSteps.find((step) => step.id === 'user-query').value;
            return await handleUserQuery(userQuery);
          },
        },
        {
          id: 'display-employee-details',
          message: ({ previousValue }) => previousValue,
          end: true,
        },
      ]}
    />
  );
};

export default ChatbotComponent;
