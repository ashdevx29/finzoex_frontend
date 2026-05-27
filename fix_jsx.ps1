$files = Get-ChildItem -Path "src" -Recurse -Include "*.jsx"
$totalFixed = 0
foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName)
    $original = $c

    # class=" -> className=" (skip already correct ones)
    $c = [regex]::Replace($c, ' class="', ' className="')
    $c = [regex]::Replace($c, " class='", " className='")
    $c = [regex]::Replace($c, "`tclass=`"", "`tclassName=`"")

    # for=" -> htmlFor="
    $c = [regex]::Replace($c, ' for="', ' htmlFor="')
    $c = [regex]::Replace($c, " for='", " htmlFor='")

    # Fix double replacement: classNameName -> className
    $c = $c -replace 'classNameName=', 'className='

    if ($c -ne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $c)
        $totalFixed++
        Write-Host "Fixed: $($f.Name)"
    }
}
Write-Host "Total: $totalFixed files fixed"
