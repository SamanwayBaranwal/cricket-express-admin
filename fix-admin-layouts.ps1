$adminPages = Get-ChildItem -Path "src\pages\admin\*.tsx"

foreach ($file in $adminPages) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Remove the AdminLayout import
    $updatedContent = $content -replace "import AdminLayout from `"@/components/admin/AdminLayout`";", ""
    
    # Remove the AdminLayout wrapper
    $updatedContent = $updatedContent -replace "<AdminLayout>(\s*)<div", "<div"
    $updatedContent = $updatedContent -replace "</div>(\s*)</AdminLayout>", "</div>"
    
    # Write the updated content back to the file
    Set-Content -Path $file.FullName -Value $updatedContent
    
    Write-Host "Fixed $($file.Name)"
}

Write-Host "All admin pages have been fixed!"
