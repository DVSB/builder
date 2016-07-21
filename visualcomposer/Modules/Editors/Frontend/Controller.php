<?php

namespace VisualComposer\Modules\Editors\Frontend;

use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Templates;
use VisualComposer\Helpers\Request;
use VisualComposer\Helpers\Nonce;
use VisualComposer\Framework\Container;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Helpers\Url;

/**
 * Class Controller.
 */
class Controller extends Container implements Module
{
    use EventsFilters;

    /**
     * Frontend constructor.
     */
    public function __construct()
    {
        /** @see \VisualComposer\Modules\Editors\Frontend\Controller::renderEditorBase */
        $this->addFilter(
            'vcv:ajax:frontend',
            'renderEditorBase'
        );
    }

    /**
     * @param \VisualComposer\Helpers\Request $request
     * @param \VisualComposer\Helpers\Templates $templates
     * @param \VisualComposer\Helpers\Nonce $nonce
     *
     * @return string
     */
    private function renderEditorBase(Request $request, Templates $templates, Nonce $nonce)
    {
        $sourceId = (int)$request->input('vcv-source-id');
        $this->setupPost($sourceId);

        $link = get_permalink($sourceId);
        $question = (preg_match('/\?/', $link) ? '&' : '?');
        $query = [
            'vcv-editable' => '1',
            'vcv-nonce' => $nonce->admin(),
        ];

        $editableLink = $link . $question . http_build_query($query);

        return $templates->render(
            'editor/frontend/frontend.php',
            [
                'editableLink' => $editableLink,
            ]
        );
    }

    /**
     * @param $sourceId
     *
     * @return \WP_Post
     */
    private function setupPost($sourceId)
    {
        global $post_type, $post_type_object, $post;
        $post = get_post($sourceId);
        setup_postdata($post);
        $post_type = $post->post_type;
        $post_type_object = get_post_type_object($post_type);

        return $post;
    }

    public function getFrontendUrl($postId, Url $urlHelper)
    {
        $url = $urlHelper->ajax(
            [
                'vcv-action' => 'frontend',
                'vcv-source-id' => $postId,
            ]
        );

        return $url;
    }

    public function getPostData()
    {
        global $post_type, $post_type_object, $post;
        $data = [];

        $data['id'] = get_the_ID();
        $data['status'] = $post->post_status;

        $permalink = get_permalink();
        if (!$permalink) {
            $permalink = '';
        }
        $previewUrl = get_preview_post_link($post);
        $viewable = is_post_type_viewable($post_type_object);
        $data['permalink'] = $permalink;
        $data['previewUrl'] = $previewUrl;
        $data['viewable'] = $viewable;

        return $data;
    }
}
