---
layout: post
title:  "AUTOCSV2SSIS"
date:   2015-11-25 12:39:50
categories: jekyll tutorial portfolio
description: "How you use Powershell to automate importing CSV files into SSIS. And a quick look into the code"

images:

  - url: /assets/images/project_thumbnails/excel.png
    alt: Excel Logo
    title: CSV to SSIS

status: draft
---

# The setting

During the Minor Business Intelligence I worked for a company which has a number of testing machines with flat file logging enabled. These files are in CSV format.

# The problem

When the operator spots a problem on the realtime logging system an employee transfers the logfiles with a USB stick to the office environment. In the office environment (Excel) they create graphs to analyze the problem. This is a very costly procedure which our project group was tasked to remedy. 

We chose to use SSIS to load the data into a Data Vault and use Qlikview to create the analysis. Seems great right? However, there are still a couple of steps here that can get automated. This script tackles the problem of manually loading up the CSV files in SSIS. 

# The solution

Because the files are dropped at undetermined times I created a script that monitors a directory for new files. The PowerShell script:

- Registers an ObjectEvent (FileSystemWatcher)
- User drops one or more CSV files into the directory
- The FileSystemWatcher uses a timer to establish whether or not we have a record of all the added files. It does this by turning off the Timer at the start of the function and enabling it at the end. By this logic once the timer runs out we have a record of all the added files. Each ObjectEvent adds the name of the file to an Array.
- When the Timer runs out, copy each file to the SSIS working directory and rename it to the name given in the SSIS package for the Flat File Source. This name is taken from the CSV file.
- When all files are copied and renamed we call the SSIS package using DTEXEC
- Check if SSIS package executed succesfully, relay this information to the user
- Remove all files from the SSIS working directory
- Clear the Array
- Done. Waits for new files to be dropped into the monitoring folder

# The code

The code might change before the article changes so keep up with the [current version on Github](https://github.com/midasvo/AUTOCSV2SSIS). Or just download the [zip](https://github.com/midasvo/AUTOCSV2SSIS/archive/master.zip).


	$package = "\path\to\Package.dtsx"

	$SSISWorkingDirectory = "\path\to\SSISWorkingDirectory"
	$MonitoringDirectory = '\path\to\MonitoringDirectory'

	$filter = '*.*'  # Wildcard filter                        
	$fsw = New-Object IO.FileSystemWatcher $MonitoringDirectory, $filter -Property @{IncludeSubdirectories = $false;NotifyFilter = [IO.NotifyFilters]'FileName, LastWrite'} 

	$timer = New-Object timers.timer
	$timer.Interval = 5000

	$global:files=@()

	Write-Host "Starting script" -fore green

	function Run-SSIS-Package {
	    dtexec /f $package # Execute SSIS Package
	    Write-Host $LASTEXITCODE
	    if($LASTEXITCODE -eq 0) {
	        Write-Host 'Executed SSIS package succesfully. Time for cleanup...' -fore green

	        Write-Host 'Removing files from SSIS Staging folder' -fore green
	        Remove-Item $SSISWorkingDirectory\*
	        
	        Write-Host 'Clearing files array' -fore green
	        $global:files = @()
	    } else { # add error handling for the other error codes
	        Write-Host "Encountered an error ('$LASTEXITCODE') while executing SSIS package.. " -fore red
	        Write-Host 'Removing files from SSIS Staging folder'
	        Remove-Item $SSISWorkingDirectory\*
	        
	        Write-Host 'Clearing files array'
	        $global:files = @()
	    }
	}

	function Get-Machine-Name($logfilename) {

	    Write-Host $MonitoringDirectory\$logfilename -foreground Green
	    $data = Import-CSV $MonitoringDirectory\$logfilename -Delimiter ';'
	    $machinename = $data[0].Machine # Assume a file is for one machine, so only need first element

	    return $machinename
	}

	Register-ObjectEvent -InputObject $timer -EventName Elapsed -SourceIdentifier Timer.Output -Action {
	    $timer.Enabled = $False
	    foreach ($name in $global:files) {
	        $machinename = Get-Machine-Name($name)
	        Write-Host 'Machinename: ' $machinename #change to $extractedname for clarity
	        Write-Host 'Copying ' $name 'to SSIS location and renaming'
	        Copy-Item $MonitoringDirectory\$name -Destination $SSISWorkingDirectory\$machinename'.csv'
	    }
	    Write-Host 'Start SSIS package now' -fore green
	    Run-SSIS-Package
	}

	Register-ObjectEvent $fsw Created -SourceIdentifier FileCreated -Action { 
	    $timer.Enabled = $False

	    $name = $Event.SourceEventArgs.Name # change to $filename for clarity
	    $timeStamp = $Event.TimeGenerated 

	    Write-Host "Detected new file '$name' on $timeStamp" -fore green 

	    Write-Host 'File: '$MonitoringDirectory\$name -foreground Green    
	    
	    $global:files+=$name
	    $timer.Enabled = $True
	} 

