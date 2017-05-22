<?php

namespace VisualComposer\Modules\Settings\Pages;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Modules\Settings\Traits\Page;

/**
 * Class Hub.
 */
class Hub extends Container /*implements Module*/
{
    use Page;
    use EventsFilters;

    /**
     * @var string
     */
    protected $slug = 'vcv-hub';

    /**
     * @var string
     */
    protected $templatePath = 'settings/pages/hub/index';

    /**
     * Hub constructor.
     */
    public function __construct()
    {
        /** @see \VisualComposer\Modules\Settings\Pages\Hub::addPage */
        $this->addFilter(
            'vcv:settings:getPages',
            'addPage',
            50
        );
    }

    /**
     * @param array $pages
     *
     * @return array
     */
    private function addPage($pages)
    {
        $pages[] = [
            'slug' => $this->getSlug(),
            'title' => __('HUB', 'vcwb'),
            'controller' => $this,
        ];

        return $pages;
    }
}
