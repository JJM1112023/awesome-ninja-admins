from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HARDENED = ROOT / "zero-brain" / "command-center.html"


def source() -> str:
    return HARDENED.read_text(encoding="utf-8")


def test_hardened_entrypoint_exists_and_wraps_zero() -> None:
    text = source()
    assert 'src="index.html"' in text
    assert 'data-zero-hardening' not in text  # runtime marker, not static markup
    assert "installHardening" in text


def test_mobile_cards_can_shrink_below_132px() -> None:
    text = source()
    assert "minmax(min(100%, 96px), 1fr)" in text
    assert "@media (max-width: 380px)" in text


def test_legacy_clipboard_checks_boolean_result() -> None:
    text = source()
    assert "doc.execCommand('copy') === true" in text
    assert "copied ? done() : blocked()" in text


def test_deep_link_rebuilds_from_current_full_url() -> None:
    text = source()
    assert "if (label === 'Link')" in text
    assert "value.indexOf('#node=')" in text
    assert "new URL(win.location.href)" in text
    assert "url.hash = value.slice(hashAt + 1)" in text
    assert "win.selected" not in text


def test_copy_override_normalizes_link_before_clipboard_write() -> None:
    text = source()
    normalize = text.index("if (label === 'Link')")
    clipboard = text.index("win.navigator.clipboard.writeText(value)")
    assert normalize >= 0
    assert clipboard > normalize
