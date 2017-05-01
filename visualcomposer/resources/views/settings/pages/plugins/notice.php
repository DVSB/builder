<?php
global $status, $page, $s, $totals;
?>
<script type="text/html" id="vcv-deactivation-notice-template">
    <tr class="plugin-update-tr" id="vcv-visual-composer-website-builder">
        <td colspan="3" class="plugin-update colspanchange">
            <div class="notice inline notice-warning notice-alt">
                <p>You are about to deactivate your copy of Visual Composer Website Builder and won’t be able to manage your content. Your content remains untouched but due to plugin deactivation required CSS styles will be missing. To ensure correct content display use
                    <a href="//visualcomposer.io/deactivate">this free plugin</a> that will load CSS styles automatically.
                </p>
                <p>
                    <a href="<?php echo wp_nonce_url(
                        'plugins.php?action=deactivate&amp;plugin=' . VCV_PLUGIN_BASE_NAME . '&amp;plugin_status='
                        . $status . '&amp;paged=' . $page . '&amp;s=' . $s,
                        'deactivate-plugin_' . VCV_PLUGIN_BASE_NAME
                    ) ?>" class="vcv-deactivation-submit-button button button-primary">Deactivate Visual Composer</a>
                </p>
            </div>
        </td>
    </tr>
</script>