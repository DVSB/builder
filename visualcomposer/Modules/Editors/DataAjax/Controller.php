<?php

namespace VisualComposer\Modules\Editors\DataAjax;

use VisualComposer\Framework\Illuminate\Contracts\Events\Dispatcher;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Request;
use VisualComposer\Framework\Container;

/**
 * Class Controller
 */
class Controller extends Container implements Module
{
    /**
     * @var \VisualComposer\Helpers\Request
     */
    protected $request;
    /**
     * @var \VisualComposer\Framework\Illuminate\Contracts\Events\Dispatcher
     */
    protected $event;

    /**
     * Controller constructor
     *
     * @param \VisualComposer\Framework\Illuminate\Contracts\Events\Dispatcher $event
     * @param \VisualComposer\Helpers\Request $request
     */
    public function __construct(Dispatcher $event, Request $request)
    {
        $this->event = $event;
        $this->request = $request;

        add_action(
            'vcv:ajax:loader:getData:adminNonce',
            function () {
                /** @see \VisualComposer\Modules\Editors\DataAjax\Controller::getData */
                $this->call('getData');
            }
        );

        add_action(
            'vcv:ajax:loader:setData:adminNonce',
            function () {
                /** @see \VisualComposer\Modules\Editors\DataAjax\Controller::setData */
                $this->call('setData');
            }
        );
    }

    /**
     * Get post content
     */
    private function getData()
    {
        $data = '';
        $sourceId = $this->request->input('vcv-source-id');
        if (is_numeric($sourceId)) {
            // @todo: access checks
            // @todo: fix react components if there is empty page content
            $postMeta = get_post_meta($sourceId, VCV_PREFIX . 'pageContent', true);

            $data = !empty($postMeta) ? $postMeta : get_post($sourceId)->post_content;
        }
        echo is_array($data) ? json_encode($data) : $data;
    }

    /**
     * Save post content and used assets
     */
    private function setData()
    {
        $data = $this->request->input('vcv-data');
        $content = $this->request->input('vcv-content');
        $sourceId = $this->request->input('vcv-source-id');
        if (is_numeric($sourceId)) {
            // @todo: save elements on page
            $post = get_post($sourceId);
            $post->post_content = stripslashes($content); // @todo: check for stripslashes - maybe not needed!
            wp_update_post($post);
            // In WordPress 4.4 + update_post_meta called if we use $post->meta_input = [ 'vcv:pageContent' => $data ]
            update_post_meta($sourceId, VCV_PREFIX . 'pageContent', $data);
            $this->event->fire(
                'vcv:postAjax:setPostData',
                [
                    $sourceId,
                    $post,
                    $data,
                ]
            );
            die(json_encode(['status' => 'ok']));
        }
        die(json_encode(['status' => 'fail']));
    }
}
