$files = Get-ChildItem -Path "src" -Recurse -Include "*.jsx","*.js"
$count = 0

foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName)
    $original = $c
    
    # Fix: var moment = require("moment") -> import moment from "moment"
    $c = $c -replace 'var moment = require\("moment"\);', 'import moment from "moment";'
    
    # Fix: src={require("../img/...")} -> src with dynamic import using new URL
    # Replace require() inside src={} with Vite-compatible import.meta.url pattern
    $c = [regex]::Replace($c, 'src=\{require\("(\.\.\/[^"]+)"\)\}', {
        param($m)
        $path = $m.Groups[1].Value
        'src={new URL("' + $path + '", import.meta.url).href}'
    })
    
    $c = [regex]::Replace($c, "src=\{require\('(\.\.\/[^']+)'\)\}", {
        param($m)
        $path = $m.Groups[1].Value
        'src={new URL("' + $path + '", import.meta.url).href}'
    })

    if ($c -ne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $c)
        $count++
        Write-Host "Fixed: $($f.Name)"
    }
}
Write-Host "Total fixed: $count files"
