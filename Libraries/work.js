document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed.');
    
    // Function to check if an element is empty
    function isElementEmpty(element) {
        console.log('Checking if element is empty:', element);
        return element.innerHTML.trim() === '';
    }

    // Function to hide parent divs if their ul elements are empty
    function hideEmptyFooterColumns() {
        // Get the footer element
        const footer = document.getElementById('footer');
        console.log('Footer element:', footer);
        
        if (footer) {
            // Define the specific columns to check
            const columnIds = ['footer-column-1', 'footer-column-2', 'footer-column-3', 'footer-column-4'];

            // Iterate through each column id
            columnIds.forEach(columnId => {
                // Get the column element by id
                const column = document.getElementById(columnId);
                console.log(`Checking column: ${columnId}`, column);
                
                if (column) {
                    // Get the ul element within the column
                    const ul = column.querySelector('ul');
                    console.log('UL element:', ul);
                    
                    // Check if the ul is empty
                    if (ul && isElementEmpty(ul)) {
                        console.log(`UL in ${columnId} is empty. Hiding parent column.`);
                        // Hide the parent div if ul is empty
                        const parentColumn = column.closest('.col-12.col-sm-12.col-md-3');
                        console.log('Parent column to hide:', parentColumn);
                        if (parentColumn) {
                            parentColumn.style.display = 'none';
                            console.log(`Parent column ${parentColumn.id || 'with no ID'} is now hidden.`);
                        } else {
                            console.log('Parent column not found.');
                        }
                    } else {
                        console.log(`UL in ${columnId} is not empty or UL element not found.`);
                    }
                } else {
                    console.log(`Column ${columnId} not found.`);
                }
            });
        } else {
            console.log('Footer element not found.');
        }
    }

    // Run the function
    hideEmptyFooterColumns();
});
