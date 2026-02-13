#!/bin/bash

# JavaScript Assignment Testing Script with Diff Comparison
# CINF 301: Web Application Development

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}JavaScript Assignment Diff Test${NC}"
echo -e "${BLUE}=======================================${NC}"
echo ""

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo -e "${RED}ERROR: Node.js is not installed or not in PATH${NC}"
    exit 1
fi

# Check if results.out exists
if [ ! -f "results.out" ]; then
    echo -e "${RED}ERROR: results.out not found. Please create expected output first.${NC}"
    exit 1
fi

# Function to create output for a single student
create_student_output() {
    local student_dir="$1"
    local clean_name="${student_dir%/}"
    local output_file="${clean_name}_output.tmp"
    
    # Clear the output file
    > "$output_file"
    
    # Run each question and append to output file
    for question in {1..9}; do
        local q_file="$student_dir/q${question}.js"
        if [ -f "$q_file" ]; then
            if [ $question -gt 1 ]; then
                echo "=== Q${question} OUTPUT ===" >> "$output_file"
            fi
            node "$q_file" >> "$output_file" 2>/dev/null
            if [ $? -ne 0 ]; then
                echo "ERROR: Question ${question} failed to run" >> "$output_file"
            fi
        else
            if [ $question -gt 1 ]; then
                echo "=== Q${question} OUTPUT ===" >> "$output_file"
            fi
            echo "ERROR: q${question}.js not found" >> "$output_file"
        fi
    done
}

# Global variables for tracking results
total_students=0
correct_students=0

# Function to test a single student with diff
test_student_diff() {
    local student_dir="$1"
    local student_name=$(basename "$student_dir")
    # Remove trailing slash from student_dir for the output filename
    local clean_name="${student_dir%/}"
    local output_file="${clean_name}_output.tmp"
    
    # Create student output
    create_student_output "$student_dir"
    
    # Compare with expected results
    # Run diff and capture exit code properly
    diff -u results.out "$output_file" >/dev/null 2>&1
    local diff_exit_code=$?
    
    # Get the actual diff output for parsing (only if there are differences)
    local diff_result=""
    if [ $diff_exit_code -ne 0 ]; then
        diff_result=$(diff -u results.out "$output_file" 2>/dev/null)
    fi
    
    if [ $diff_exit_code -eq 0 ]; then
        echo -e "${GREEN}✓ ${student_name}: ALL CORRECT${NC}"
        correct_students=$((correct_students + 1))
    else
        echo -e "${RED}✗ ${student_name}: DIFFERENCES FOUND${NC}"
        
        # Parse diff output to show which questions differ
        local wrong_questions=()
        local current_question=""
        
        while IFS= read -r line; do
            if [[ $line == *"=== Q"*"OUTPUT ==="* ]]; then
                # Extract question number
                current_question=$(echo "$line" | sed 's/.*Q\([0-9]\+\).*/\1/')
            elif [[ $line == "-"* || $line == "+"* ]] && [[ $line != "---"* ]] && [[ $line != "+++"* ]]; then
                # This is a difference line
                if [[ ! " ${wrong_questions[@]} " =~ " ${current_question} " ]] && [[ -n "$current_question" ]]; then
                    wrong_questions+=("$current_question")
                fi
            fi
        done <<< "$diff_result"
        
        # Handle Q1 specially since it doesn't have a header
        if echo "$diff_result" | head -20 | grep -q "^[-+]" && [[ ! " ${wrong_questions[@]} " =~ " 1 " ]]; then
            wrong_questions=(1 "${wrong_questions[@]}")
        fi
        
        if [ ${#wrong_questions[@]} -eq 0 ]; then
            # If no specific questions found, show general error
            echo -e "  ${YELLOW}  Issues detected but couldn't identify specific questions${NC}"
        else
            # Sort question numbers
            IFS=$'\n' wrong_questions=($(sort -n <<<"${wrong_questions[*]}"))
            unset IFS
            echo -e "  ${YELLOW}  Wrong: Q$(IFS=', Q'; echo "${wrong_questions[*]}")${NC}"
        fi
        
        # Show sample of differences (first few lines that aren't file headers)
        local sample_diff=$(echo "$diff_result" | grep "^[-+]" | grep -v "^[-+][-+][-+]" | head -3)
        if [ -n "$sample_diff" ]; then
            echo -e "  ${YELLOW}  Sample differences:${NC}"
            while IFS= read -r line; do
                if [[ $line == "-"* ]]; then
                    echo -e "    ${RED}Expected: ${line:1}${NC}"
                elif [[ $line == "+"* ]]; then
                    echo -e "    ${GREEN}Got:      ${line:1}${NC}"
                fi
            done <<< "$sample_diff"
        fi
    fi
    
    # Cleanup temporary file
    rm -f "$output_file"
    echo ""
}

# Main execution
main() {
    echo "Scanning for student directories..."
    echo ""
    
    local found_students=false
    
    for student_dir in */; do
        if [ -d "$student_dir" ] && [ "$student_dir" != "solutions/" ]; then
            # Check if it contains any .js files
            if ls "$student_dir"*.js 1> /dev/null 2>&1; then
                found_students=true
                total_students=$((total_students + 1))
                
                test_student_diff "$student_dir"
            fi
        fi
    done
    
    if [ "$found_students" = false ]; then
        echo -e "${YELLOW}No student directories with .js files found.${NC}"
        echo "Make sure student submission folders are in the same directory as this script."
        echo "Each student folder should contain files named q1.js, q2.js, etc."
    else
        echo -e "${BLUE}=======================================${NC}"
        echo -e "${BLUE}SUMMARY${NC}"
        echo -e "${GREEN}Correct solutions: ${correct_students}/${total_students}${NC}"
        echo -e "${RED}Incorrect solutions: $((total_students - correct_students))/${total_students}${NC}"
        echo -e "${BLUE}=======================================${NC}"
    fi
    
    echo -e "${BLUE}Testing complete!${NC}"
}

# Run main function
main