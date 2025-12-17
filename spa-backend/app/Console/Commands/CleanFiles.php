<?php

namespace App\Console\Commands;

use App\Jobs\DeleteFilesJob;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class CleanFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:fresh-clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ejecuta migrate:fresh --seed y limpia archivos';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Ejecutando migrate:fresh --seed...');
        Artisan::call('migrate:fresh', ['--seed' => true]);

        $this->info('Eliminando archivos...');
        DeleteFilesJob::dispatch();

        $this->info('Listo ✅');
    }
}
