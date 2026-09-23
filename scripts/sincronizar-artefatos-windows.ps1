[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [string]$Origem = (Get-Location).Path,

    [string]$Destino = 'C:\Users\clean\OneDrive\Documents\Projeto_ZeloGO'
)

$ErrorActionPreference = 'Stop'

$origemResolvida = (Resolve-Path -LiteralPath $Origem).Path
New-Item -ItemType Directory -Force -Path $Destino | Out-Null

$diretoriosExcluidos = @(
    (Join-Path $origemResolvida '.git'),
    (Join-Path $origemResolvida 'node_modules'),
    (Join-Path $origemResolvida 'dist'),
    (Join-Path $origemResolvida 'dist-server'),
    (Join-Path $origemResolvida 'coverage'),
    (Join-Path $origemResolvida '.neon-claim')
)

$arquivosExcluidos = @(
    '.env',
    '.env.*',
    '*.log'
)

$robocopyArgs = @(
    $origemResolvida,
    $Destino,
    '/E',
    '/COPY:DAT',
    '/DCOPY:DAT',
    '/R:2',
    '/W:2',
    '/XJ',
    '/NFL',
    '/NDL',
    '/NP'
)

foreach ($diretorio in $diretoriosExcluidos) {
    $robocopyArgs += @('/XD', $diretorio)
}

$robocopyArgs += @('/XF') + $arquivosExcluidos

& robocopy @robocopyArgs
$codigoRobocopy = $LASTEXITCODE
if ($codigoRobocopy -gt 7) {
    throw "A sincronização falhou. Código Robocopy: $codigoRobocopy"
}

$commit = 'não disponível'
try {
    $commitObtido = (& git -C $origemResolvida rev-parse --short HEAD 2>$null)
    if ($LASTEXITCODE -eq 0 -and $commitObtido) {
        $commit = $commitObtido.Trim()
    }
} catch {
    # O projeto pode ter sido recebido como arquivo, sem uma cópia Git local.
}

$manifesto = @(
    'ZeloGO — manifesto de sincronização',
    "Data: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')",
    "Origem: $origemResolvida",
    "Destino: $Destino",
    "Commit de origem: $commit",
    'Exclusões: .git, node_modules, dist, dist-server, coverage, .neon-claim, .env, .env.*, *.log',
    '',
    'Arquivos sincronizados:'
)
$manifesto += Get-ChildItem -LiteralPath $Destino -Recurse -File |
    Sort-Object FullName |
    ForEach-Object { $_.FullName.Substring($Destino.Length).TrimStart('\') }

$manifesto | Set-Content -LiteralPath (Join-Path $Destino 'SYNC-MANIFEST.txt') -Encoding UTF8
Write-Host "Sincronização concluída em: $Destino"
Write-Host "Commit de origem: $commit"
exit 0
